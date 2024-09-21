import {
    getLogin,
    getLogout,
    getRegiser,
    setToken,
  } from '../api';

  import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

  export const loginThunk = createAsyncThunk(
    '/login',
    async (formData, thunkAPI) => {
      try {
        setToken(token);
        const response = await getLogin(formData);
        return response;
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const registerThunk = createAsyncThunk(
    '/register',
    async (formData, thunkAPI) => {
      try {
        const response = await getRegiser(formData);
        return response;
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const logOutThunk = createAsyncThunk(
    '/logOut',
    async (_, thunkAPI) => {
      try {
        await getLogout();
  
        return;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const refreshThunk = createAsyncThunk(
    '/refresh',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      try {
        setToken(token);
        const response = await getRefreshUser();
        return response;
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    },
    {
      condition: (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;
  
        if (!token) return false;
        return true;
      },
    }
  );

  const INITIAL_STATE = {
    user: { email: null, balance: null, id: null },
    token: null,
    refreshToken: null,
    isLoading: false,
    error: null,
    isAuth: false,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    extraReducers: builder =>
      builder
        .addCase(registerThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuth = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuth = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        })
        .addCase(refreshThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuth = true;
          state.user = action.payload;
        })
        .addCase(logOutThunk.fulfilled, (state, action) => {
          return INITIAL_STATE;
        })
        .addMatcher(
          isAnyOf(
            registerThunk.pending,
            loginThunk.pending,
            refreshThunk.pending,
            logOutThunk.pending
          ),
          state => {
            state.isLoading = true;
            state.error = null;
          }
        )
        .addMatcher(
          isAnyOf(
            logOutThunk.rejected,
            registerThunk.rejected,
            loginThunk.rejected,
            refreshThunk.rejected
          ),
          (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          }
        ),
  });
  
  export const authReducer = authSlice.reducer;
import axios from 'axios';

const serverUrl = process.env.REACT_APP_API_URL;

const contactsInstance = axios.create({
  baseURL: serverUrl,
});

export const setToken = token => {
  contactsInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const getRegiser = async formData => {
  const { data } = await contactsInstance.post('/api/register', formData);
  setToken(data.token);
  return data;
};

export const getLogin = async formData => {
  const { data } = await contactsInstance.post('/api/login', formData);
  setToken(data.token);
  return data;
};

export const getLogout = async () => {
  const { data } = await contactsInstance.post('api/logout');
  return data;
};

export const getRefreshUser = async () => {
  const { data } = await contactsInstance.get('api/refresh-token');
  return data;
};

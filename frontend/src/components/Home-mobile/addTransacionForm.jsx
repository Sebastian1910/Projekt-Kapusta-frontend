import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransactionSuccess } from "../../store/reducers/transactionReducer";
import axios from "axios";

const AddTransaction = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("expense");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/${type}-categories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [type]);

  const handleSubmitTransaction = async () => {
    if (!description || !category || amount === 0) {
      console.log("Please fill in all fields");
    } else {
      const transaction = { amount, description, category, type };
      try {
        const url =
          type === "expense"
            ? "/api/transaction/expense"
            : "/api/transaction/income";
        const response = await axios.post(url, transaction);
        dispatch(addTransactionSuccess(response.data));
        console.log(
          `Transaction submitted: ${amount} UAH, ${description}, ${category}`,
        );
        handleClear();
      } catch (error) {
        console.error("Error submitting transaction:", error);
        console.log("Error submitting transaction. Please try again.");
      }
    }
  };

  const handleClear = () => {
    setDescription("");
    setCategory("");
    setAmount(0);
  };

  return (
    <div>
      <h2>Add New Transaction</h2>
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="00.00 UAH"
        />
        <div>
          <button onClick={() => setType("income")}>Income</button>
          <button onClick={() => setType("expense")}>Expense</button>
        </div>
        <div>
          <button onClick={handleSubmitTransaction}>Submit</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;

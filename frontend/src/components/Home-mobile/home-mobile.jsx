import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransactionSuccess } from "../../store/reducers/transactionReducer";
import axios from "axios";
import Modal from "../Modal";

const HomeMobile = () => {
  const [balance, setBalance] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("expense");
  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async (transactionType) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/${transactionType}-categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories(type);
  }, [type]);

  const handleSubmitTransaction = async () => {
    if (!description || !category || amount === 0) {
      console.log("Please fill in all fields");
    } else {
      const transaction = {
        amount,
        description,
        category,
        type: type === "expense" ? "expense" : "income",
      };
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
        setCurrentStep(1);
        handleClear();
      } catch (error) {
        console.error("Error submitting transaction:", error);
        console.log("Error submitting transaction. Please try again.");
      }
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTypeToggle = (newType) => {
    setType(newType);
  };

  const handleClear = () => {
    setDescription("");
    setCategory("");
    setAmount(0);
  };

  const handleConfirmBalance = () => {
    if (balance > 0) {
      setCurrentStep(2);
    } else {
      console.log("Please enter a valid balance amount.");
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <h2>Balance:</h2>
          <div>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="00.00 UAH"
            />
            <button onClick={handleConfirmBalance}>CONFIRM</button>
          </div>
          {balance === 0 && <Modal />}
        </div>
      )}

      {currentStep === 2 && (
        <div className="transaction-screen">
          <h3>Product Description</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description"
          />

          <h3>Product Category</h3>
          <select value={category} onChange={handleCategoryChange}>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="amount-input">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="00.00 UAH"
            />
          </div>

          <div className="buttons">
            <button onClick={() => handleTypeToggle("income")}>INCOME</button>
            <button onClick={() => handleTypeToggle("expense")}>EXPENSE</button>
          </div>

          <div className="buttons">
            <button onClick={handleSubmitTransaction}>SUBMIT</button>
            <button onClick={handleClear}>CLEAR</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMobile;

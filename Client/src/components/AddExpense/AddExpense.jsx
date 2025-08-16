import React from "react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import toast from "react-hot-toast";

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  const data = {
    title,
    amount,
    date,
    category,
  };

  const handleAddExpense = () => {
    fetch("https://personal-expense-tracker-vind.onrender.com/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Expense Successfully Added");
        onAdd();
        setExpense([...expense, data]);
      });
  };
  return (
    <div className="w-full lg:w-1/3 shadow-xl rounded-xl overflow-hidden lg:sticky lg:top-0">
      <div className="flex items-center gap-2 mb-2 justify-center bg-green-700 h-20 text-white">
        <IoMdAdd className="text-3xl" />
        <h1 className="text-2xl font-semibold">Add New Expense</h1>
      </div>
      <div className="card bg-base-100 w-full max-w-sm mx-auto">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="text-base">Expense Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input"
              placeholder="e.g. Lunch at restaurant"
            />
            <label className="label text-base text-black">
              Amount <FaBangladeshiTakaSign />
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="input text-black"
              placeholder="0.00"
            />
            <label className="text-base">Date</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="input"
            />
            <label className="text-base">Category</label>
            <select
              name=""
              id=""
              className="select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="rent">Rent</option>
            </select>
            <button
              type="submit"
              onClick={handleAddExpense}
              className="btn bg-green-700 mt-4 text-white"
            >
              Add
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

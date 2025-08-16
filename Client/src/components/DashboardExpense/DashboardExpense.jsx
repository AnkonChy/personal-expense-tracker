import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiFilter } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaTrash } from "react-icons/fa6";
const DashboardExpense = ({
  expenses,
  setSelectCategory,
  handleDelete,
  update,
  setFromDate,
  setToDate,
  totalExpense,
  highestExpense,
  clear,
}) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const updateFormData = {
    title,
    amount,
    date,
    category,
  };

  const handleEdit = async (id) => {
    try {
      const res = await fetch(`https://personal-expense-tracker-vind.onrender.com/expenses/${id}`);
      const data = await res.json();
      setSelectedExpense(data);
      // Populate form fields with the fetched data
      setTitle(data.title);
      setAmount(data.amount);
      setDate(data.date);
      setCategory(data.category);
      document.getElementById("my_modal_5").showModal();
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://personal-expense-tracker-vind.onrender.com/expenses/${selectedExpense._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateFormData),
        }
      );

      if (res.ok) {
        toast.success("Expense updated successfully");
        document.getElementById("my_modal_5").close();

        update();
      } else {
        toast.error("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  return (
    <div className="md:w-full lg:w-2/3 shadow-xl rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 justify-center bg-violet-950 h-20 text-white">
        <CiFilter className="text-3xl" />
        <h1 className="text-2xl font-semibold">Filter Expenses</h1>
      </div>
      <div className="flex items-center gap-2 mb-2 p-2">
        <div className="w-1/2 bg-blue-900 rounded-lg p-6 text-white text-lg">
          <h1>Total Expenses</h1>
          <div className="flex items-center">
            {totalExpense} <FaBangladeshiTakaSign />
          </div>
        </div>
        <div className="flex-1 bg-green-700 rounded-lg p-6 text-white text-lg">
          <h1>Highest Expense</h1>
          <div className="flex items-center">
            {highestExpense ? highestExpense : "No Expenses Yet"}
            <FaBangladeshiTakaSign />
          </div>
        </div>
      </div>
      <div className="p-2 flex items-center justify-between">
        <div className="flex flex-col">
          <label className="text-sm font-bold">Category</label>
          <select
            onChange={(e) => setSelectCategory(e.target.value)}
            className="select mt-1"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <div>
            <label className="text-sm font-bold">Date From</label>
            <input
              onChange={(e) => setFromDate(e.target.value)}
              type="date"
              className="input"
            />
          </div>
          <div>
            <label className="text-sm font-bold">Date To</label>
            <input
              onChange={(e) => setToDate(e.target.value)}
              type="date"
              className="input"
            />
          </div>
          <div>
            <button onClick={clear} className="btn bg-blue-900 text-white">
              Clear
            </button>
          </div>
        </div>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Expenses yet
                </td>
              </tr>
            ) : (
              expenses.map((expense, index) => (
                <tr key={expense._id}>
                  <td>{index + 1}</td>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(expense._id)}
                      className="bg-black px-4 py-[10px] rounded text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="ml-1 bg-black px-4 py-[10px] rounded text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Expense</h3>

          {selectedExpense ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <label className="block text-sm font-medium">Expense Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input w-full"
              />
              <label className="block text-sm font-medium">Amount (৳)</label>
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className="input w-full"
              />
              <label className="block text-sm font-medium">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                value={date}
                className="input w-full"
              />
              <label className="block text-sm font-medium">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="select w-full"
              >
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="rent">Rent</option>
              </select>

              <button
                type="submit"
                className="btn bg-green-700 mt-4 text-white"
              >
                Update
              </button>
            </form>
          ) : (
            <p>Loading...</p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardExpense;

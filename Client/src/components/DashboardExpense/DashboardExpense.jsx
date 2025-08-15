import React from "react";
import { CiFilter } from "react-icons/ci";
import { FaBangladeshiTakaSign, FaTrash } from "react-icons/fa6";
const DashboardExpense = ({ expenses, setSelectCategory }) => {
  return (
    <div className="w-2/3 shadow-xl rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 justify-center bg-violet-950 h-20 text-white">
        <CiFilter className="text-3xl" />
        <h1 className="text-2xl font-semibold">Filter Expenses</h1>
      </div>
      <div className="flex items-center gap-2 mb-2 p-2">
        <div className="w-1/2 bg-blue-900 rounded-lg p-6 text-white text-lg">
          <h1>Total Expenses</h1>
          <div className="flex items-center">
            0 <FaBangladeshiTakaSign />
          </div>
        </div>
        <div className="flex-1 bg-green-700 rounded-lg p-6 text-white text-lg">
          <h1>Highest Expense</h1>
          <div className="flex items-center">
            No Expenses Yet <FaBangladeshiTakaSign />
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
        <div className="flex items-center gap-2">
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" />
          </div>
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" />
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
                    <button className="bg-black px-4 py-[10px] rounded text-white">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardExpense;

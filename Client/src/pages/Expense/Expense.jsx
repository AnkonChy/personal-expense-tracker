import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import AddExpense from "../../components/AddExpense/AddExpense";
import DashboardExpense from "../../components/DashboardExpense/DashboardExpense";
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  const filterdExpense = selectCategory
    ? expenses.filter((expense) => expense?.category === selectCategory)
    : expenses;
  const fetchExpenses = () => {
    fetch("http://localhost:7000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };

  useEffect(() => {
    fetchExpenses(); // on first load
  }, []);
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col justify-center items-center mt-10 mb-6">
        <h1 className="text-4xl font-bold">Expense Tracker</h1>
        <p className="my-2">
          Track your expenses and manage your budget efficiently
        </p>
      </div>
      <div className="flex items-start gap-6">
        <AddExpense onAdd={fetchExpenses} />
        <DashboardExpense
          expenses={filterdExpense}
          //   handleDelete={handleDelete}
          setSelectCategory={setSelectCategory}
        />
      </div>
    </div>
  );
};

export default Expense;

import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import AddExpense from "../../components/AddExpense/AddExpense";
import DashboardExpense from "../../components/DashboardExpense/DashboardExpense";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // const { totalExpense, highestExpense } = useLoaderData();
  const [totalExpense, setTotalExpense] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);

  // const filterdExpense = selectCategory
  //   ? expenses.filter((expense) => expense?.category === selectCategory)
  //   : expenses;

  const filteredExpense = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      (!selectCategory || expense.category === selectCategory) && // category filter
      (!from || expenseDate >= from) && // from date filter
      (!to || expenseDate <= to) // to date filter
    );
  });

  const clear = () => {
    setSelectCategory("");
    setFromDate("");
    setToDate("");
  };

  const fetchExpenses = () => {
    fetch("http://localhost:7000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      const res = await fetch(`http://localhost:7000/expenses/${id}`, {
        method: "DELETE",
      });
      const newData = expenses.filter((e) => e._id !== id);
      setExpenses(newData);
      Swal.fire("Deleted!", "Your expense has been deleted.", "success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // on first load
  }, []);
  useEffect(() => {
    fetch("http://localhost:7000/sumExpense")
      .then((res) => res.json())
      .then((data) => {
        setTotalExpense(data.totalExpense);
        setHighestExpense(data.highestExpense);
      });
  }, [expenses]);
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col justify-center items-center mt-10 mb-6">
        <h1 className="text-4xl font-bold">Expense Tracker</h1>
        <p className="my-2">
          Track your expenses and manage your budget efficiently
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <AddExpense onAdd={fetchExpenses} />
        <DashboardExpense
          expenses={filteredExpense}
          handleDelete={handleDelete}
          setSelectCategory={setSelectCategory}
          update={fetchExpenses}
          setFromDate={setFromDate}
          setToDate={setToDate}
          clear={clear}
          totalExpense={totalExpense}
          highestExpense={highestExpense}
        />
      </div>
    </div>
  );
};

export default Expense;

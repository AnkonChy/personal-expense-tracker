import { createBrowserRouter } from "react-router";
import Expense from "../pages/Expense/Expense";

const router = createBrowserRouter([{ path: "/", Component: Expense }]);

export default router;

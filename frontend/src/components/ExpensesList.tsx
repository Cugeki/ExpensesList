import { useEffect, useState } from "react";
import { deleteExpense, editExpense, fetchExpenses } from "../api/expenses";
import AddExpense from "./AddExpense";
import ExpenseFilter from "./ExpenseFilters";
import ExpenseItems from "./ExpenseItems";
import type { Expense } from "./types/types";
import "../styles/ExpensesList.css";
import PieChartExp from "./PieChartExp";

export default function ExpensesList({ token }: { token: string }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [sortBy, setSortBy] = useState<
    "amount" | "date" | "title" | "category"
  >("amount");

  const [searchTerm, setSearchTerm] = useState("");

  const [filterCategory, setFilterCategory] = useState("");

  const filteredAndSorted = [...expenses]
    .filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory
        ? expense.category === filterCategory
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "amount") return a.amount - b.amount;
      if (sortBy === "date") return a.date.localeCompare(b.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });

  const sumExpenses = filteredAndSorted.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );
  const delExpense = async (id: number) => {
    await deleteExpense(id, token);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const onEdit = async (
    id: number,
    title: string,
    amount: number,
    category: string,
  ) => {
    const updated = await editExpense(id, title, amount, category, token);
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await fetchExpenses(token);
      setExpenses(data);
    };
    fetchExpense();
  }, [token]);

  return (
    <div className="expenses-layout">
      <div className="expenses-chart">
        <PieChartExp expenses={filteredAndSorted} />
      </div>
      <div className="expenses-left">
        <ExpenseFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <ExpenseItems
          filteredAndSorted={filteredAndSorted}
          delExpense={delExpense}
          onEdit={onEdit}
        />

        <h3 className="total">Total Expenses: ${sumExpenses.toFixed(2)}</h3>
      </div>
      <div className="expenses-right">
        <AddExpense setExpenses={setExpenses} token={token} />
      </div>
    </div>
  );
}

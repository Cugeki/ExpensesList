import { useEffect, useState } from "react";
import { deleteExpense, fetchExpenses } from "../api/expenses";
import AddExpense from "./AddExpense";
import ExpenseFilter from "./ExpenseFilters";

import ExpenseItems from "./ExpenseItems";
import type { Expense } from "./types/types";

export default function ExpensesList() {
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
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };
    fetchExpense();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
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
      />

      <h3>Total Expenses: ${sumExpenses.toFixed(2)}</h3>
      <AddExpense setExpenses={setExpenses} />
    </div>
  );
}

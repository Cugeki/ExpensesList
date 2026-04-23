import { useState } from "react";
import { addExpense } from "../api/expenses";
import { CATEGORIES, type ExpenseSetterProps } from "./types/types";

export default function AddExpense({ setExpenses }: ExpenseSetterProps) {
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const POSTExpense = async () => {
    const newExpense = await addExpense(title, Number(amount), category);
    setExpenses((prev) => [...prev, newExpense]);
    setTitle("");
    setAmount("");
  };
  return (
    <>
      <h3>Add Expense</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") POSTExpense();
        }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") POSTExpense();
        }}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={POSTExpense}>Add</button>
    </>
  );
}

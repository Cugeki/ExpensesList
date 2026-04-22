import { useEffect, useState } from "react";
import { fetchExpenses } from "../api/expenses";
import { addExpense } from "../api/expenses";
import { deleteExpense } from "../api/expenses";

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  user_id: number;
}

export default function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [sortBy, setSortBy] = useState<"amount" | "date" | "title">("amount");
  const [searchTerm, setSearchTerm] = useState("");

  const POSTExpense = async () => {
    await addExpense(title, Number(amount));
  };

  const delExpense = async (id: number) => {
    await deleteExpense(id);
  };

  const filteredAndSorted = [...expenses]
    .filter((expense) =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "amount") return a.amount - b.amount;
      if (sortBy === "date") return a.date.localeCompare(b.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };
    fetchExpense();
  }, [expenses]);
  return (
    <div>
      <input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "amount" | "date" | "title")
        }
      >
        <option value="amount">Sort by amount</option>
        <option value="date">Sort by date</option>
        <option value="title">Sort by title</option>
      </select>
      <h2>Expenses</h2>

      <ul>
        {filteredAndSorted.map((expense: Expense) => (
          <li key={expense.id}>
            {expense.title}: ${expense.amount} on {expense.date}
            <button onClick={() => delExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Expense</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={POSTExpense}>Add</button>
    </div>
  );
}

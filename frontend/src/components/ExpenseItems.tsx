import type { Expense } from "./types/types";
import "../styles/ExpenseItems.css";
import { useState } from "react";
import { CATEGORIES } from "./types/types";

export default function ExpenseItems({
  filteredAndSorted,
  delExpense,
  onEdit,
}: {
  filteredAndSorted: Expense[];
  delExpense: (id: number) => Promise<void>;
  onEdit: (
    id: number,
    title: string,
    amount: number,
    category: string,
  ) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");

  function startEdit(expense: Expense) {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(String(expense.amount));
    setEditCategory(expense.category);
  }
  if (filteredAndSorted.length === 0) {
    return <p className="no-expenses">No expenses to display</p>;
  } else
    return (
      <>
        <ul className="expenses-list">
          {filteredAndSorted.map((expense: Expense) => (
            <li
              key={expense.id}
              className={`expense-item ${expense.id === editingId ? "editing" : ""}`}
            >
              {expense.id === editingId ? (
                <>
                  <div className="expense-info">
                    <input
                      className="edit-input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      className="edit-input"
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                    <select
                      className="edit-input"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="expense-right">
                    <button
                      className="save-btn"
                      onClick={async () => {
                        await onEdit(
                          editingId,
                          editTitle,
                          Number(editAmount),
                          editCategory,
                        );
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="expense-info">
                    <span className="expense-title">{expense.title}</span>
                    <span className="expense-meta">
                      {expense.category} · {expense.date}
                    </span>
                  </div>
                  <div className="expense-right">
                    <span className="expense-amount">${expense.amount}</span>
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => delExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </>
    );
}

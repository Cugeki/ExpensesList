import type { Expense } from "./types/types";

export default function ExpenseItems({
  filteredAndSorted,
  delExpense,
}: {
  filteredAndSorted: Expense[];
  delExpense: (id: number) => Promise<void>;
}) {
  return (
    <>
      <ul>
        {filteredAndSorted.map((expense: Expense) => (
          <li key={expense.id}>
            {expense.title}: ${expense.amount} : {expense.category} on
            {expense.date}
            <button onClick={() => delExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

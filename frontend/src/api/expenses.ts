const BASE_URL = "http://localhost:3002/api/expenses";

export const fetchExpenses = async () => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
};

export const addExpense = async (title: string, amount: number) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      title,
      amount,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to add expense");
  }
  return res.json();
};
export const deleteExpense = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete expense ");
  }
  return res.json();
};

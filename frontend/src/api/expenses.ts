const BASE_URL = "http://localhost:3002/api/expenses";

export const fetchExpenses = async (token: string) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
};

export const addExpense = async (
  title: string,
  amount: number,
  category: string,
  token: string,
) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      amount,
      category,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to add expense");
  }
  return res.json();
};
export const deleteExpense = async (id: number, token: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete expense ");
  }
};
export const editExpense = async (
  id: number,
  title: string,
  amount: number,
  category: string,
  token: string,
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, amount, category }),
  });
  if (!res.ok) {
    throw new Error("Failed to edit expense");
  }
  return res.json();
};

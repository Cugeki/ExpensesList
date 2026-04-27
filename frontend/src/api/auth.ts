const BASE_URL = "http://localhost:3002/api/auth";

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
export async function register(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getBudget(token: string) {
  const res = await fetch(`${BASE_URL}/budget`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function updateBudget(token: string, budget: number) {
  const res = await fetch(`${BASE_URL}/budget`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ budget }),
  });
  return res.json();
}

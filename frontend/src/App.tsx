import { useState } from "react";
import Login from "./components/Login";
import ExpensesList from "./components/ExpensesList";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  function handleLogin(token: string) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  if (!token) {
    return <Login onLogin={handleLogin} />;
  } else
    return (
      <div>
        <h1>Welcome to the Expense Tracker!</h1>
        <button onClick={handleLogout}>Logout</button>
        <ExpensesList />
      </div>
    );
}

export default App;

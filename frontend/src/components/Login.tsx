import { useState } from "react";
import { login, register } from "../api/auth";

interface Props {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleLogin() {
    const data = await login(email, password);
    if (data.token) {
      onLogin(data.token);
    } else {
      alert(data.error);
    }
  }

  async function handleRegister() {
    const data = await register(email, password);
    if (data.id) {
      alert("Registration successful! Please log in.");
      setIsRegistering(false);
    } else {
      alert(data.error);
    }
  }
  return (
    <div>
      <h1>{isRegistering ? "Create your account" : "Log in"}</h1>
      <p>
        {" "}
        {isRegistering
          ? "Sign up to get started!"
          : "Welcome back, Please log in!"}
      </p>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? "Register" : "Login"}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Back to login" : "Create account   "}
      </button>
    </div>
  );
}

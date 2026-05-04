import { useState } from "react";

export default function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin@cafe.com" && password === "1234") {
      setError("");
      setLoggedIn(true);
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <header className="login-nav">
        <p className="dashboard-label">Admin Panel</p>
        <h1 className="dashboard-brand">Pixel Brew Café</h1>
      </header>

      <main className="login-view">
        <div className="login-container">
          <h2>Welcome Back</h2>
          <p className="login-hint">Sign in to access café reports and database analytics.</p>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
          />

          <button onClick={handleLogin}>Sign In</button>

          {error ? <div className="login-error" role="alert">{error}</div> : null}

          <p className="login-hint">
            Demo Login: admin@cafe.com / 1234
          </p>
        </div>
      </main>
    </div>
  );
}
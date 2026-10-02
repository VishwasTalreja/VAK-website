import API_URL from "../config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setStatus("");

      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save JWT temporarily in the browser
      localStorage.setItem("adminToken", data.token);
      onLogin(data.token);

      // Tell App.jsx that login worked
      navigate("/admin/dashboard");

    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminLoginPage">
      <div className="adminLoginBox">

        <div className="adminLoginBrand">
          <h1>VAK</h1>
          <p>TAX & LEGAL SERVICES</p>
        </div>

        <div className="adminLoginHeader">
          <p className="sectionLabel">ADMINISTRATION</p>
          <h2>Admin Login</h2>
          <p>Sign in to manage the VAK website.</p>
        </div>

        <form onSubmit={handleSubmit} className="adminLoginForm">

          <label>Email</label>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {status && (
            <p className="adminLoginStatus">
              {status}
            </p>
          )}

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;
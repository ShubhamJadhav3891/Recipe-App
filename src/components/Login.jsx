import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS import

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state added
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset error before making request
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });

      console.log("Login Response:", res.data); // Debugging ke liye
      localStorage.setItem("token", res.data.token); // ✅ Token Store karna zaroori hai
      localStorage.setItem("userEmail", email); // ✅ User ka email store karein
      setIsLoggedIn(true);
      navigate("/explore"); // ✅ Redirect to Explore Page after login
    } catch (error) {
      console.error("Login Failed:", error.response?.data);
      setError(error.response?.data?.message || "Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "25rem" }}>
        <h2 className="text-center mb-3">Login</h2>

        {error && <p className="text-danger text-center">{error}</p>} {/* ✅ Error message display */}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email} // ✅ Controlled input
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password} // ✅ Controlled input
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
        <p className="text-center mt-3">
          New user? <Link to="/account">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", 
        { name: username, email, password }, 
        { headers: { "Content-Type": "application/json" } }
      );
  
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert(`Registration Failed: ${error.response?.data?.message || "Server Error"}`);
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "25rem" }}>
        <h2 className="text-center mb-3">Register</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
        <p className="text-center mt-3">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { loginUser } from "../services/requests";
import { useNavigate, Link } from "react-router-dom";
import './styles/Login.css'; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const result = await loginUser(username, password);
    console.log("Submitted username", username);
    console.log("Submitted password", password);
    setUsername("");
    setPassword("");
    if (result.error) {
      alert(`${result.error}`);
    } else if (result && result.message === "Login successful") {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Three Good Things</h1>

        <div className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />

          <button className="login-button" onClick={handleSubmit}>
            Login
          </button>

          <p className="login-text">
            Don&apos;t have an account? <Link to="/create">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

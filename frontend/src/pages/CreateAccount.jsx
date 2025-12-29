import { useState } from "react";
import { createUser } from "../services/requests";
import { useNavigate, Link } from "react-router-dom";
import './styles/CreateAccount.css'; // import CSS

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateSubmit = async () => {
    const res = await createUser(username, email, password);
    console.log("res", res);
    if (res.error) {
      alert(`Ran into the following problem when creating account: ${res.error}`);
    } else if (res && res.message === "Account created") {
      navigate("/");
    }
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <h1 className="account-title">Three Good Things</h1>

        <div className="account-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="account-input"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="account-input"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="account-input"
          />

          <button className="account-button" onClick={handleCreateSubmit}>
            Create Account
          </button>

          <p className="login-text">
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

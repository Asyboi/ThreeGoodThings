import PropTypes from "prop-types";
import { useState } from "react";
import { createUser } from "../services/requests";
import { useNavigate, Link } from "react-router-dom";
import './styles/CreateAccount.css'; // import CSS

const CreateAccount = ({ setIsLoggedIn }) => {
  // prop type validation
  CreateAccount.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);
    const res = await createUser(username.trim(), email.trim(), password);
    setSubmitting(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    if (res && res.message === "Account created") {
      setUsername("");
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError("Account creation failed");
    }
  };

  return (
    <div className="tg-page tg-surface">
      <div className="tg-auth">
        <div className="tg-card tg-card--light">
          <div className="auth-header">
            <h1 className="auth-title">Three Good Things</h1>
            <p className="auth-subtitle">Create an account to start your journal.</p>
          </div>

          <form className="tg-stack" onSubmit={handleCreateSubmit}>
            <div>
              <label className="tg-label" htmlFor="create-username">
                Username
              </label>
              <input
                id="create-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Pick a username"
                className="tg-field"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="tg-label" htmlFor="create-email">
                Email
              </label>
              <input
                id="create-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="tg-field"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="tg-label" htmlFor="create-password">
                Password
              </label>
              <input
                id="create-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="tg-field"
                autoComplete="new-password"
              />
            </div>

            {error ? (
              <div className="tg-alert" role="alert">
                {error}
              </div>
            ) : null}

            <button
              className="tg-btn tg-btn--primary auth-cta"
              type="submit"
              disabled={submitting || !username.trim() || !email.trim() || !password}
            >
              {submitting ? "Creating…" : "Create Account"}
            </button>

            <p className="tg-help auth-footer">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

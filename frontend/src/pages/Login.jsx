import PropTypes from "prop-types";
import { useState } from "react";
import { loginUser } from "../services/requests";
import { useNavigate, Link } from "react-router-dom";
import './styles/Login.css'; 

const Login = ({ setIsLoggedIn }) => {
  // prop type validation
  Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);
    const result = await loginUser(username.trim(), password);
    setSubmitting(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (result && result.message === "Login successful") {
      setUsername("");
      setPassword("");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError("Login failed");
    }
  };

  return (
    <div className="tg-page tg-surface">
      <div className="tg-auth">
        <div className="tg-card tg-card--light">
          <div className="auth-header">
            <h1 className="auth-title">Three Good Things</h1>
            <p className="auth-subtitle">Log in to capture today’s positives.</p>
          </div>

          <form className="tg-stack" onSubmit={handleSubmit}>
            <div>
              <label className="tg-label" htmlFor="login-username">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                className="tg-field"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="tg-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="tg-field"
                autoComplete="current-password"
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
              disabled={submitting || !username.trim() || !password}
            >
              {submitting ? "Logging in…" : "Login"}
            </button>

            <p className="tg-help auth-footer">
              Don&apos;t have an account? <Link to="/create">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

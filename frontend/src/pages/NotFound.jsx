import './styles/NotFound.css'; // import CSS
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="tg-page tg-surface">
      <div className="tg-container">
        <div className="tg-card notfound-card">
          <h1 className="tg-title notfound-title">Page not found</h1>
          <p className="notfound-text">This page doesn’t exist. Head back to Home.</p>
          <div className="notfound-actions">
            <button className="tg-btn tg-btn--primary" onClick={() => navigate("/")}>Go Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

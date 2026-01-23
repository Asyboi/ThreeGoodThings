import { useNavigate } from "react-router-dom";
import './styles/Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const handleLogClick = () => {
    navigate("/log");
  };

  const handlePastEntries = () => {
    navigate("/pastentries");
  };

  return (
    <div className="tg-page tg-surface">
      <div className="tg-container">
        <div className="tg-card home-card">
          <div className="home-hero">
            <h1 className="tg-title">Welcome to Three Good Things</h1>
            <p className="tg-subtitle home-text">
              A way to reflect on the positive moments in your life. Write three good things every day.
            </p>
          </div>

          <div className="home-actions">
            <button className="tg-btn tg-btn--primary home-action" onClick={handleLogClick}>
              Log Three Good Things
            </button>

            <button className="tg-btn tg-btn--primary home-action" onClick={handlePastEntries}>
              Look at Past Entries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

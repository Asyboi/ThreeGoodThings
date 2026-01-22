import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {logoutUser} from '../services/requests';
import './styles/Home.css'; 

const Home = ({ setIsLoggedIn }) => {
  // sets prop types for isLoggedIn and setIsLoggedIn (for type safety)
  Home.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();

  const handleLogClick = () => {
    navigate("/log");
  };

  const handlePastEntries = () => {
    navigate("/pastentries");
  };

  const handleLogOut = () => {
    logoutUser();
    setIsLoggedIn(false);
    navigate("/login");
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

            <button className="tg-btn tg-btn--secondary home-action" onClick={handlePastEntries}>
              Look at Past Entries
            </button>
          </div>

          <div className="home-footer">
            <button className="tg-btn tg-btn--destructive" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

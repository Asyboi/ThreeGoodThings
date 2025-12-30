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
    <div className="home-container">
      <h1 className="home-title">Welcome to Three Good Things</h1>

      <p className="home-text">
        A way to reflect on the positive moments in your life. Write three good
        things every day.
      </p>

      <div className="home-buttons">
        <button className="home-button" onClick={handleLogClick}>
          Log Three Good Things
        </button>

        <button className="home-button" onClick={handlePastEntries}>
          Look at Past Entries
        </button>
      </div>
        <button className="logout-button" onClick={handleLogOut}>
          Log Out
        </button>
    </div>
  );
};

export default Home;

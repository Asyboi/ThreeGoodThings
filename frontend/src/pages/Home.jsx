import { useNavigate } from "react-router-dom";
import {logoutUser} from '../services/requests';
import './styles/Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const handleLogClick = () => {
    navigate("/log");
  };

  const handlePastEntries = () => {
    navigate("/pastentries");
  };

  const handleLogOut = () => {
    logoutUser();
    navigate("/login");
  }

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

        <button onClick={handleLogOut} /* TODO: style log out button */>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;

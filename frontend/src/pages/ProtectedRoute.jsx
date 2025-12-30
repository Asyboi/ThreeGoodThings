import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

/* redirects user to '/login' page if they try to access another page while not logged in */
const ProtectedRoute = ({ isLoggedIn, children }) => {
  // prop type validation
  ProtectedRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

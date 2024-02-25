// ProtectedRoute.js
import PropTypes from "prop-types";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../Contex/AuthContex";

const ProtectedRoute = ({ children }) => {
  // const auth = useAuth();

  // if (!auth.user) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

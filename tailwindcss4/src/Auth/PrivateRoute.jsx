import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/Auth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

console.log('The user' , user)

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;

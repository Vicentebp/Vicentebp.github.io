import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Private = ({ children }) => {
  const { signed } = useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default Private;

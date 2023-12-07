import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Private from "./Private";
const RoutesApp = () => {
  return (
    <Routes>
      <Route
        path={"/home"}
        element={
          <Private>
            <Home></Home>
          </Private>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
      <Route path={"/login"} element={<Login></Login>}></Route>
    </Routes>
  );
};
export default RoutesApp;

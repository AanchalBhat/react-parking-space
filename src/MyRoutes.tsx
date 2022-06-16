import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Registration from "./components/Registration";
import ParkingSlot from "./components/ParkingSlot";
import { useNavigate } from "react-router-dom";

const MyRoutes = () => {
  const navigate = useNavigate();
  const alertUser = () => {
    console.log("refreshed");

    navigate("/");
  };
  React.useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/parking" element={<ParkingSlot />} />
    </Routes>
  );
};
export default MyRoutes;

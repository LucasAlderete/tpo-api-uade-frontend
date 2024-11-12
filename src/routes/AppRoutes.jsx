import { Route, Routes } from "react-router-dom";
import Header from "../components/Header.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import MyProfile from "../pages/MyProfile.jsx";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />
          <Route path="/my-profile" element={< MyProfile/>} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;

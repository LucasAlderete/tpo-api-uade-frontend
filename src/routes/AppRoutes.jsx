import { Route, Routes } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRoutes;

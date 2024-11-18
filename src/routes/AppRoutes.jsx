import { Route, Routes } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import Cart from "../pages/Cart.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import MyFavorites from "../pages/MyFavorites.jsx";

const AppRoutes = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />
          <Route path="/my-profile" element={< MyProfile/>} />
          <Route path="/cart" element={< Cart/>} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/my-favorites" element={<MyFavorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Pokemon from "../pages/Pokemon.jsx";
import Header from "../components/Header.jsx";
import PokemonDetail from "../pages/PokemonDetail.jsx";
import PokemonType from "../pages/PokemonType.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={< />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;

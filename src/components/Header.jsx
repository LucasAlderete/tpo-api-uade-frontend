import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            [NombreEcommerce]
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link" aria-current="page" to="/Login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link" aria-current="page" to="/Register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link" aria-current="page" to="/MyProfile">
                  My Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link" aria-current="page" to="/Cart">
                  Cart
                </Link>
              </li>
              
            </ul>
            <form class="d-flex" role="search">
              <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Nombre de usuario
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><button class="dropdown-item" type="button">Mi Perfil</button></li>
                  <li><button class="dropdown-item text-danger" type="button" onClick={handleLogOut}>Cerrar Sesión</button></li>
                </ul>
              </div>
              
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
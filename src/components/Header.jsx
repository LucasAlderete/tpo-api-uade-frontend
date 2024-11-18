import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";

const Header = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const handleLogOut = () => {
    logout();
  };

  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData && isAuthenticated() ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    const handleUserDataChange = (event) => {
      setUserData(event.detail);
    };

    window.addEventListener("userDataChanged", handleUserDataChange);

    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, []);

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {isAuthenticated()
                    ? `${userData.name} ${userData.surname}`
                    : "Guest"}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {isAuthenticated() ? (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/my-profile"
                          aria-current="page"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={handleLogOut}
                        >
                          Log out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          Registrarse
                        </Link>
                      </li>
                    </>
                  )}
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

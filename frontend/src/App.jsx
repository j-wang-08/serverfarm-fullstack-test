import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const logOut = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          ServerFarm
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" onClick={logOut}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<>Welcome</>} />
          <Route exact path="/home" element={<>Home</>} />
          <Route exact path="/login" element={<>Login</>} />
          <Route exact path="/register" element={<>Register</>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";

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
    <div className="">
      <nav className="flex justify-between items-center flex-nowrap">
        <div>
          <Link to={"/"} className="">
            ServerFarm
          </Link>
          <ul className="">
            <li className="">
              <Link to={"/home"} className="">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <ul className="">
          {isLoggedIn ? (
            <li className="">
              <Link to={"/login"} className="" onClick={logOut}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className="">
                <Link to={"/login"} className="">
                  Login
                </Link>
              </li>
              <li className="">
                <Link to={"/register"} className="">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="">
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

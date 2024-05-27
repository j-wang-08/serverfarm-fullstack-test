import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AuthService from "./services/auth.service";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(token !== null);

  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, [token]);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="flex items-center gap-5 px-5 py-4 bg-gray-500 text-white">
        <Link to={"/"} className=" text-2xl font-bold">
          ServerFarm
        </Link>
        <div className="flex justify-between items-center flex-grow">
          <ul>
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
          </ul>

          <ul className="flex items-center gap-3">
            {isLoggedIn ? (
              <li>
                <Link to={"/login"} onClick={logOut}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="">
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="">
        <Routes>
          <Route exact path="/" element={<>Welcome</>} />
          <Route
            exact
            path="/home"
            element={isLoggedIn ? <>Home</> : <Navigate to="/login" />}
          />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;

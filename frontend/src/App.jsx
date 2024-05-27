import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
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
          <Route exact path="/home" element={<>Home</>} />
          <Route exact path="/login" element={<>Login</>} />
          <Route exact path="/register" element={<RegisterForm />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;

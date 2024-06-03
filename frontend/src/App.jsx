import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AuthService from "./services/auth.service";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import CreatePostForm from "./components/CreatePostForm";
import Posts from "./components/Posts";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MenuIcon from "./components/MenuIcon";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(token !== null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, [token]);

  const logOut = () => {
    AuthService.logout();
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-screen max-w-screen-2xl mx-auto flex justify-between items-center gap-5 px-5 py-4 bg-gray-500 text-white">
        <Link to={"/"} className=" text-2xl font-bold">
          ServerFarm
        </Link>
        <div className="sm:flex-grow">
          <div
            className={`absolute overflow-y-hidden top-full right-0 sm:relative bg-gray-500 w-screen sm:w-full flex flex-col sm:flex-row justify-between items-center ${
              isMenuOpen ? "h-fit" : "h-0 sm:h-fit"
            } transition-all duration-300 ease-out`}
          >
            <ul className="flex flex-col sm:flex-row items-center gap-0 sm:gap-3">
              <li className="py-2 sm:py-0">
                <Link to={"/posts"} onClick={handleMenuClick}>
                  Posts
                </Link>
              </li>
              <li className="py-2 sm:py-0">
                <Link to={"/posts/create"} onClick={handleMenuClick}>
                  Create Post
                </Link>
              </li>
            </ul>

            <ul className="flex flex-col sm:flex-row items-center gap-0 sm:gap-3">
              {isLoggedIn ? (
                <li className="py-2 sm:py-0">
                  <Link
                    to={"/login"}
                    onClick={() => {
                      handleMenuClick();
                      logOut();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="py-2 sm:py-0">
                    <Link to={"/login"} onClick={handleMenuClick}>
                      Login
                    </Link>
                  </li>
                  <li className="py-2 sm:py-0">
                    <Link to={"/register"} onClick={handleMenuClick}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <MenuIcon isOpen={isMenuOpen} handleClick={handleMenuClick} />
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto mt-16 pt-10">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/posts"
            element={isLoggedIn ? <Posts /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/posts/create"
            element={isLoggedIn ? <CreatePostForm /> : <Navigate to="/login" />}
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

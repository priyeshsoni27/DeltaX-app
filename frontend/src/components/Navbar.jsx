import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Navbar = () => {
  const navigate = useNavigate();
  const [displayState, SetDisplayState] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("userCred"));
  const logout = () => {
    sessionStorage.removeItem("userCred");
    navigate("/");
  };
  return (
    <>
      <nav className="bg-black top-0 sticky text-3xl h-20 text-white ">
        <div className="h-full flex items-center justify-between px-8">
          <span style={{ color: "#1DB954", fontweight: "bold" }}>SPOTIFY</span>
          {user === null ? (
            <div className="flex justify-between w-1/6">
              <button onClick={() => SetDisplayState(1)}>Log In</button>
              <button onClick={() => SetDisplayState(2)}>Sign In</button>
            </div>
          ) : (
            <div className="flex space-x-10">
              <span className="capitalize">Welcome {user.name}</span>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
      {displayState === 1 && <LoginForm />}
      {displayState === 2 && <RegistrationForm />}
    </>
  );
};
export default Navbar;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [alert, SetAlert] = useState(false);

  const [formValue, SetFormValue] = useState({
    email: "",
    password: "",
  });
  setTimeout(() => {
    SetAlert(false);
  }, 3000);
  const handleChange = (event) => {
    SetFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const checkUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/info/getuser", {
          email: formValue.email,
          password: formValue.password,
        })
        .then((res) => {
          if (res.data["userExist"] === false) SetAlert(!alert);
          else {
            sessionStorage.setItem("userCred", JSON.stringify(res.data[0]));
            navigate("/home");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 color:#1DB954 w-auto"
            src={logo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          onSubmit={checkUser}
          method="POST"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
        {alert && (
          <div className="flex justify-center text-lg">
            <span>Account does not exist</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;

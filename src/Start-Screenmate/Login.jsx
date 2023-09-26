import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInput = useRef(null);
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    if (!loginData.userName || !loginData.password) {
      if (!loginData.userName) {
        if (!loginData.password) {
          setError("Username and Password are required fields");
        } else setError("Username is required field");
      } else {
        setError("Password is required field");
      }

      return;
    }
    axios
      .post("https://screenmates-beta-v.onrender.com/login/", loginData)
      .then(function (response) {
        console.log(response); // handle success
        navigate("/");
        localStorage.setItem("userName", loginData.userName);
      })
      .catch(function (error) {
        console.log(error); // handle error
        // setError(error.response.data.err);
      });
  };

  const handleShowPassword = () => {
    const inputType = showPassword ? "password" : "text";
    passwordInput.current.type = inputType;
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Link className="my-[2em] back mx-[3em] fixed w-fit h-fit" to="..">
        <IoChevronBackOutline size={30} />
      </Link>
      <div className="reg flex-grow login-bg flex flex-col items-center justify-center">
        <div className=" text-center pb-[2em] md:pb-[5em]">
          <h1 className="text-[3rem] font-black main-text-gradient-color">
            Screenmate
          </h1>
          <p>Login Now</p>
        </div>
        <div className="credi-grid pb-[5em]">
          <input
            type="text"
            className="reg-username reg-input"
            placeholder="Username"
            required
            name="userName"
            onChange={(event) =>
              setLoginData({
                ...loginData,
                [event.target.name]: event.target.value,
              })
            }
          />
          <div className="password relative reg-password">
            <input
              ref={passwordInput}
              type="password"
              required
              className="reg-input w-full"
              placeholder="Password"
              name="password"
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  [event.target.name]: event.target.value,
                })
              }
            />
            <button
              onClick={handleShowPassword}
              className="absolute center-v right-[30px]"
            >
              {showPassword ? (
                <AiFillEye size={25} />
              ) : (
                <AiFillEyeInvisible size={25} />
              )}
            </button>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="reg-button main-text-gradient-background mr-[0.5em] rounded-full p-[1em]  transition duration-300"
          >
            Login
          </button>
          <Link
            to="/register"
            className="login-button text-center border rounded-full p-[1em] hover:bg-white hover:text-black bg-transparent transition duration-300"
          >
            Register
          </Link>
          {error && <p className="text-red-400 block reg-username">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;

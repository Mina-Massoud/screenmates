import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInput = useRef(null);
  const [isImgSelected, setIsImgSelected] = useState(false);
  const [regData, setRegData] = useState({});
  const navigate = useNavigate();

  const createWidget = () => {
    var myCropWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dik65evmf",
        uploadPreset: "z9w9zvet",
        folder: "widgetUpload",
        cropping: true,
        resourceType: "image",
        accept: "image/*",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          if (result.info.resource_type === "image") {
            setRegData((prev) => ({
              ...prev,
              ["imgURL"]: result.info.url,
            }));
            ImgSelected();
          }
        }
      }
    );

    return myCropWidget;
  };

  const myCropWidget = useRef();

  useEffect(() => {
    myCropWidget.current = createWidget();
  }, []);

  const openWidget = () => {
    myCropWidget.current.open();
  };

  const handleRegister = () => {
    axios
      .post(`${import.meta.env.VITE_PORT}/signup/`, regData)
      .then(function (response) {
        console.log(response); // handle success
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error); // handle error
      });
  };

  const handleShowPassword = () => {
    if (showPassword) {
      passwordInput.current.type = "password";
      setShowPassword(false);
    } else {
      passwordInput.current.type = "text";
      setShowPassword(true);
    }
  };

  const handleRemoveImg = () => {
    setIsImgSelected(false);
  };

  const ImgSelected = () => {
    setIsImgSelected(true);
  };

  return (
    <>
      <Link className="my-[2em] back mx-[3em] fixed w-fit h-fit" to="..">
        <IoChevronBackOutline size={30} />
      </Link>
      <div className="reg flex-grow reg-bg flex flex-col items-center justify-center">
        <div className=" text-center pb-[2em] md:pb-[5em]">
          <h1 className="text-[3rem] font-black main-text-gradient-color">
            Screenmate
          </h1>
          <p>Register Now</p>
        </div>
        <div className="credi-grid pb-[5em]">
          <input
            type="text"
            className="reg-first-name required reg-input"
            placeholder="First Name"
            name="firstName"
            id=""
            onChange={(event) => {
              setRegData((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
              }));
            }}
          />
          <input
            type="text"
            className="reg-last-name reg-input"
            placeholder="Last Name"
            name="lastName"
            id=""
            onChange={(event) => {
              setRegData((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
              }));
            }}
          />
          <input
            type="text"
            className="reg-username reg-input"
            placeholder="username"
            name="userName"
            id=""
            onChange={(event) => {
              setRegData((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
              }));
            }}
          />
          <div className="password relative reg-password">
            <input
              ref={passwordInput}
              type="password"
              className="reg-input w-full"
              placeholder="Password"
              name="password"
              id=""
              onChange={(event) => {
                setRegData((prev) => ({
                  ...prev,
                  [event.target.name]: event.target.value,
                }));
              }}
            />
            <button
              onClick={handleShowPassword}
              className="absolute center-v right-[30px]"
            >
              {!showPassword ? (
                <AiFillEyeInvisible size={25} />
              ) : (
                <AiFillEye size={25} />
              )}
            </button>
          </div>
          <div className="relative reg-button min-w-[250px]">
            <label className="p-[1em] block w-full reg-input hover:bg-white hover:text-black transition duration-300 cursor-pointer text-center">
              {!isImgSelected ? "Upload Image" : "Image Selected"}
              <button onClick={openWidget} />
            </label>
            {isImgSelected && (
              <IoIosRemoveCircleOutline
                onClick={handleRemoveImg}
                size={25}
                className="absolute center-v right-[30px] text-red-400 cursor-pointer"
              />
            )}
          </div>

          <button
            onClick={handleRegister}
            className="reg-button main-text-gradient-background rounded-full mr-[0.5em] p-[1em]  transition duration-300"
          >
            Register
          </button>
          <Link
            to="/login"
            className="login-button text-center border rounded-full p-[1em] bg-transparent hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;

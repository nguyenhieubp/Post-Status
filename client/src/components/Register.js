import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [valueUser, setValueUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const newValueUser = { ...valueUser };
    newValueUser[e.target.name] = e.target.value;
    setValueUser(newValueUser);
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (!valueUser.email.includes("@gmail.com")) {
      setValidateEmail("email not valid");
    }
    const response = await axios.post("/api/v1/auth/register", {
      name: valueUser.name,
      email: valueUser.email,
      password: valueUser.password,
    });
    const { token, nameUser } = response.data.data;
    localStorage.setItem("token", token);
    dispatch(
      login({
        name: nameUser,
        token: token,
      })
    );
    navigate("/");
  };

  return (
    <div>
      <div className="p-[2rem] mt-[4rem] outline-white outline-dashed ">
        <h1 className="text-center font-bold text-[2rem] text-green-500">
          Enter Your Account
        </h1>
        {validateEmail && (
          <div className="mt-[3rem] text-center text-red-500">
            Error: email is not correct
          </div>
        )}
        {validatePassword && (
          <div className="mt-[3rem] text-center text-red-500">
            Error: password is not correct
          </div>
        )}
        <form onSubmit={handleSubmitRegister} className="mt-[2rem]">
          <input
            onChange={(e) => handleInput(e)}
            autoComplete="off"
            className="w-[100%] p-[2rem] bg-[#222042] text-white outline"
            name="name"
            placeholder="Name"
            type="text"
          />
          <br />
          <input
            onChange={(e) => handleInput(e)}
            autoComplete="off"
            className="w-[100%] mt-[2rem] p-[2rem] bg-[#222042] text-white outline"
            name="email"
            placeholder="Email"
            type="text"
          />
          <br />
          <input
            onChange={(e) => handleInput(e)}
            autoComplete="off"
            className="w-[100%] mt-[2rem] p-[2rem] bg-[#222042] text-white outline"
            name="password"
            placeholder="Password"
            type="text"
          />
          <button
            type="submit"
            className="block text-white px-[2rem] py-[1rem] ml-[50%] translate-x-[-50%] outline mt-[2rem]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/userRedux";
import { useDispatch } from "react-redux";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueUser, setValueUser] = useState({ email: "", password: "" });
  const [messageError, setMessageError] = useState("");
  const handleInput = (e) => {
    const newValueUser = { ...valueUser };
    newValueUser[e.target.name] = e.target.value;
    setValueUser(newValueUser);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/v1/auth/login", {
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
    } catch (error) {
      setMessageError("Error: password is not correct");
    }
  };
  return (
    <div>
      <div>
        <div className="p-[2rem] mt-[4rem] outline-white outline-dashed ">
          <h1 className="text-center font-bold text-[2rem] text-green-500">
            Login
          </h1>
          {messageError && (
            <div className="mt-[3rem] text-center text-red-500">
              {messageError}
            </div>
          )}
          <form action="" onSubmit={handleLogin} className="mt-[2rem]">
            <input
              onChange={(e) => handleInput(e)}
              autoComplete="off"
              className="w-[100%] p-[2rem] bg-[#222042] text-white outline"
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

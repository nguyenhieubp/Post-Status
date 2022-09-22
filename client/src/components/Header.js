import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { getUserCurrent } from "../redux/checkCurrentUser";
const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCurrent());
  }, []);

  const { name } = useSelector((state) => state.namUserCurrent);

  const handleSignOut = () => {
    dispatch(
      login({
        name: "",
        token: "",
      })
    );
    localStorage.removeItem("token");
  };

  return (
    <div className="flex justify-between">
      <Link className="font-bold text-[2.7rem] p-[0.5rem] text-white" to="/">
        Twitter
      </Link>
      {name ? (
        <>
          <Link
            className="mx-[1.4rem] ml-[auto] text-[1.8rem] p-[0.5rem] cursor-pointer text-green-400"
            to="/login"
          >
            Hey, {name}
          </Link>
          <Link
            onClick={handleSignOut}
            className="mx-[1.4rem] text-white text-[1.8rem] p-[0.5rem] cursor-pointer"
            to="/"
          >
            Sign out
          </Link>
        </>
      ) : (
        <div className="  text-white flex ml-[auto] ">
          <Link
            className="mx-[1.4rem] text-[1.8rem] p-[0.5rem] cursor-pointer"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="mx-[1.4rem] text-[1.8rem] p-[0.5rem] cursor-pointer"
            to="/register"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ArenaText = () => {
  const navigation = useNavigate();
  const [valueText, setValueText] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return navigation("/register");
    }
    await axios.post(
      "/api/v1/posts",
      {
        content: valueText,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setValueText("");
  };
  return (
    <div className="mt-[6rem]">
      <form action="" onSubmit={handleSubmit}>
        <textarea
          value={valueText}
          onChange={(e) => setValueText(e.target.value)}
          placeholder="What's happening"
          className="bg-[#222042]  text-white p-[1rem] border-[1px] border-white w-[100%] h-[30rem]"
        ></textarea>
        <button className=" block ml-[100%] border-b-4 border-b-green-400 translate-x-[-100%] px-[0.5rem] py-[1rem] mt-[2rem] text-white font-bold border-2 border-white">
          Twitter
        </button>
      </form>
    </div>
  );
};

export default ArenaText;

import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import { getUserCurrent } from "../redux/checkCurrentUser";
import axios from "axios";
const Post = ({ content, author, time, id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCurrent());
  }, []);

  const { name } = useSelector((state) => state.namUserCurrent);

  const [deletePost, setDeletePost] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [valueContent, setValueContent] = useState(content);
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    await axios.put(
      `/api/v1/posts/${id}`,
      {
        content: valueContent,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setUpdatePost(false);
  };

  const handleDeletePost = async () => {
    await axios.delete(`/api/v1/posts/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const date = dateFormat(time, "dd/mm/yyyy");
  return (
    <div className="mt-[4rem] bg-[#443f7d]">
      <div className=" p-[1rem] text-white mt[3rem]">
        <textarea
          value={content}
          className="w-[100%] bg-[#443f7d] p-[1rem] min-h-[10rem] resize-none scrollbar-hide"
        >
          {content}
        </textarea>
        <div className="mt-[3rem] p-[2rem] flex justify-between border-t-[3px]  ">
          <div className="flex ">
            <a className="underline" href="">
              By {author}
            </a>
            <div className="ml-[3rem]">Date :{date} </div>
          </div>
          <div className="flex">
            {name === author && (
              <>
                <div
                  onClick={() => setUpdatePost(!updatePost)}
                  className="underline mr-[1.4rem]"
                  href="#"
                >
                  Update
                </div>
                <div
                  onClick={() => setDeletePost(true)}
                  className="underline mr-[1.4rem]"
                  href="#"
                >
                  Delete
                </div>
              </>
            )}
            {deletePost && (
              <>
                <div className="underline mr-[1.4rem] text-red-500" href="#">
                  Are you sure ?
                </div>
                <div
                  onClick={handleDeletePost}
                  className="underline mr-[1.4rem]"
                  href="#"
                >
                  Yes
                </div>
                <div
                  onClick={() => setDeletePost(false)}
                  className="underline "
                  href="#"
                >
                  No
                </div>
              </>
            )}
          </div>
        </div>
        {updatePost && (
          <textarea
            onChange={(e) => setValueContent(e.target.value)}
            value={valueContent}
            className="w-[100%] resize-none mt-[3rem] bg-[#16a34a] min-h-[20rem]  p-[1rem] resize-none scrollbar-hide"
          ></textarea>
        )}
        {name === author && updatePost && (
          <div className="flex justify-end">
            <div>
              <button
                onClick={handleUpdate}
                className="mr-[2rem] border-b-4 border-b-green px-[0.5rem] py-[1rem] mt-[2rem] text-white font-bold border-2 border-white"
              >
                Update
              </button>
              <button
                onClick={() => setUpdatePost(false)}
                className=" border-b-4 border-b-green px-[0.5rem] py-[1rem] mt-[2rem] text-white font-bold border-2 border-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

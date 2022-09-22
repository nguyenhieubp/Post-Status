import { configureStore } from "@reduxjs/toolkit";
import postRedux from "./postRedux";
import userRedux from "./userRedux";
import userCurrent from "./checkCurrentUser";
const store = configureStore({
  reducer: {
    posts: postRedux,
    user: userRedux,
    namUserCurrent: userCurrent,
  },
});
export default store;

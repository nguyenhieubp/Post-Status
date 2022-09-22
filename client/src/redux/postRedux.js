import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("fetchPosts/getPosts", async () => {
  return axios.get("/api/v1/posts/").then((res) => res.data);
});

export const postSlice = createSlice({
  name: "fetchPosts",
  initialState: {
    posts: [],
    loading: false,
    err: false,
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state) => {
      state.err = true;
    },
  },
});

export default postSlice.reducer;

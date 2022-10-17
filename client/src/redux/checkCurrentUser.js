import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUserCurrent = createAsyncThunk(
  "fetchUser/getUserCurrent",
  async (token) => {
    const response = await axios.get("/api/v1/auth", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.data.user;
  }
);

export const userCurrentSlice = createSlice({
  name: "fetchUser",
  initialState: {
    name: "",
  },
  extraReducers: {
    [getUserCurrent.pending]: (state) => {
      state.name = "";
    },
    [getUserCurrent.fulfilled]: (state, action) => {
      state.name = action.payload;
    },
    [getUserCurrent.rejected]: (state) => {
      state.name = "";
    },
  },
});
export default userCurrentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    token: "",
    email: "",
    password: "",
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;

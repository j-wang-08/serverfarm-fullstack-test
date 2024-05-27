import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || null;

const initialState = {
  token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

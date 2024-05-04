import { createSlice } from "@reduxjs/toolkit";
const initialState = { user: {} };
const loginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = {};
    },
  },
});

export default loginSlicer.reducer;
export const loginAction = loginSlicer.actions;

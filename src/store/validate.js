import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isValid: {
    emailRegister: true,
    passwordRegister: true,
    emailSignIn: true,
    passwordSignIn: true,
  },
  announce: {
    emailRegister: "",
    passwordRegister: "",
    signIn: "",
  },
};
const validationSlicer = createSlice({
  name: "validation",
  initialState,
  reducers: {
    // Check email Register
    emptyEmailRegister(state) {
      state.isValid.emailRegister = false;
      state.announce.emailRegister = "Please fill in your email!";
    },
    invalidEmailRegister(state) {
      state.isValid.emailRegister = false;
      state.announce.emailRegister = "Please fill in valid email!";
    },
    duplicateEmailRegister(state) {
      state.isValid.emailRegister = false;
      state.announce.emailRegister = "Your email has already taken!";
    },
    validEmailRegister(state) {
      state.isValid.emailRegister = true;
      state.announce.emailRegister = "";
    },

    // Check password Register
    emptyPasswordRegister(state) {
      state.isValid.passwordRegister = false;
      state.announce.passwordRegister = "Please fill in your password!";
    },
    notEnoughPasswordRegister(state) {
      state.isValid.passwordRegister = false;
      state.announce.passwordRegister =
        "Your password must at least 8 character";
    },
    validPasswordRegister(state) {
      state.isValid.passwordRegister = true;
      state.announce.passwordRegister = "";
    },

    // Check Sign Up
    emptyEmailSignIn(state) {
      state.isValid.emailSignIn = false;
      state.announce.signIn = "Please fill in your email and password!";
    },
    emptyPasswordSignIn(state) {
      state.isValid.passwordSignIn = false;
      state.announce.signIn = "Please fill in your email and password!";
    },
    invalidSignIn(state) {
      state.isValid.emailSignIn = true;
      state.isValid.passwordSignIn = true;
      state.announce.signIn = "Your email or password is invalid!";
    },
    validSignIn(state) {
      state.isValid.emailSignIn = true;
      state.isValid.passwordSignIn = true;
      state.announce.signIn = "";
    },
  },
});
export default validationSlicer.reducer;
export const validateAction = validationSlicer.actions;

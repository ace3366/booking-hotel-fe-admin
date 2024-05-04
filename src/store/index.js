import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./validate";
import loginReducer from "./login";
import deleteReducer from "./deleteModal";
const store = configureStore({
  reducer: {
    validate: validationReducer,
    login: loginReducer,
    delete: deleteReducer,
  },
});

export default store;

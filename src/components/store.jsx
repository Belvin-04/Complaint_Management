import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin-slice";

export default configureStore({
  reducer: {
    admin: adminReducer,
  },
});

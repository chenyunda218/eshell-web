import { configureStore } from "@reduxjs/toolkit";
import loading from "./loading";
import sidebar from "./sidebar";
import date from "./date";
import token from "./token";
import dashboard from "./dashboard";

export default configureStore({
  reducer: { loading, sidebar, date, token, dashboard },
});

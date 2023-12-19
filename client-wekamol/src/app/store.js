import { configureStore } from "@reduxjs/toolkit";
// import animeReducer from "../features/animes/animeSlice";
// import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    // animes: animeReducer,
    // user: userReducer,
  },
});

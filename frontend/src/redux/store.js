import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { userAuthApiSlice } from "./feature/userAuthApiSlice";

const apiSlices = [userAuthApiSlice];

const reducers = {
  user: userReducer,
};

apiSlices.forEach((apiSlice) => {
  reducers[apiSlice.reducerPath] = apiSlice.reducer;
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();

    apiSlices.forEach((apiSlice) => {
      middleware.push(apiSlice.middleware);
    });

    return middleware;
  },
});

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api/apiBaseSlice";

export const userAuthApiSlice = createApi({
  reducerPath: "userAuthApi",
  baseQuery,
  tagTypes: ["Admin", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ usernameOrEmail, password }) => ({
        url: "/user-auth/login",
        method: "POST",
        body: { usernameOrEmail, password },
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/user-auth/update-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useUpdatePasswordMutation } = userAuthApiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = import.meta.env.VITE_API;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${api}` }),
  tagTypes: ["Authenticated"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Authenticated"],
    }),
    checkAuthenticated: builder.query<boolean, void>({
      query: () => "/auth/checkAuthentication",
      providesTags: ["Authenticated"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckAuthenticatedQuery,
} = apiSlice;

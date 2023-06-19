import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
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
    logoutUser: builder.mutation<unknown, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Authenticated"],
    }),
    checkAuthenticated: builder.query<boolean, void>({
      query: () => "/auth/checkAuthentication",
      providesTags: ["Authenticated"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckAuthenticatedQuery,
  useLogoutUserMutation,
  useGetProductsQuery,
} = apiSlice;

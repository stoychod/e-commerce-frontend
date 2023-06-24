import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Authenticated", "Cart"],
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
      invalidatesTags: ["Authenticated", "Cart"],
    }),
    logoutUser: builder.mutation<unknown, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Authenticated", "Cart"],
    }),
    checkAuthenticated: builder.query<boolean, void>({
      query: () => "/auth/checkAuthentication",
      providesTags: ["Authenticated"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
    getProductById: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
    }),
    createCart: builder.mutation<unknown, void>({
      query: () => ({
        url: "/cart",
        method: "POST",
      }),
    }),
    getCart: builder.query<CartItem[], void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addCartItem: builder.mutation({
      query: (productData) => ({
        url: "/cart/items",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<unknown, CartItem>({
      query: (cartItem) => ({
        url: `/cart/items/${cartItem.cartItemId}`,
        method: "PUT",
        body: { quantity: cartItem.quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckAuthenticatedQuery,
  useLogoutUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateCartMutation,
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
} = apiSlice;

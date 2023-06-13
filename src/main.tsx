import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorPage from "./routes/Error/Error";
import Register from "./routes/Register/Register";
import Login from "./routes/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

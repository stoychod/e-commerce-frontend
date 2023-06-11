import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from "./routes/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

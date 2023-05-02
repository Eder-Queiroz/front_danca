import React from "react";
import ReactDOM from "react-dom/client";

// configurando router

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Client from "./components/pages/Client/Client";
import ClientInfo from "./components/pages/ClientInfo/ClientInfo";
import Cadastro from "./components/pages/Cadastro/Cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Client />,
      },
      {
        path: "/clientes/:id",
        element: <ClientInfo />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

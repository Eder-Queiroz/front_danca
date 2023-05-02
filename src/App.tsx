import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import "./style/style.css";

export default function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

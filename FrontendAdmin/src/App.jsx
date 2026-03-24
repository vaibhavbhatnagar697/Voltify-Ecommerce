import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Misc/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
}
export default App;

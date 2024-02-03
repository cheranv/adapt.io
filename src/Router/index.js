import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Contact from "../Components/Contact";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
};

export default Router;

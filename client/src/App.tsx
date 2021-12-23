import React from "react";

import MainLayout from "./common/MainLayout";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import axios from "axios";
// import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

axios.interceptors.request.use(async (req) => {
  const savedToken = await localStorage.getItem("token");
  if (savedToken) {
    req.headers!.authorization = `Bearer ${savedToken}`;
  }
  return req;
});

function App() {
  // const { user } = useAuth();
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

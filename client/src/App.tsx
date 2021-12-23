import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchJournalEntries, fetchUser } from "./store/thunks";
import { store, useAppDispatch } from "./store";

import Dashboard from "./pages/Dashboard";
import HatchwaysIntegration from "./pages/HatchwaysIntegration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainLayout from "./common/MainLayout";
import { Provider } from "react-redux";
import Signup from "./pages/Signup";

function AutoLogin(): React.ReactElement {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchJournalEntries());
  }, [dispatch]);

  return <></>;
}

function App() {
  return (
    <Provider store={store}>
      <AutoLogin />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hatchways" element={<HatchwaysIntegration />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;

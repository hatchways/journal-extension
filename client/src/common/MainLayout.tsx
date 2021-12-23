// @ts-nocheck
import React, { FunctionComponent } from "react";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./NavBar";

const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;

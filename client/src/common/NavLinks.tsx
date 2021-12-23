//@23ts-nocheck

import React, { useEffect, useState } from "react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import { useLocation, Link } from "react-router-dom";

//CSS styles
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginRight: "10rem",
  },
  tab: {
    height: "6rem",
    padding: "10px",
    color: "black",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    height: "5px",
    top: 0,
    backgroundColor: "transparent",
    "& div": {
      maxWidth: 100,
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const Navlinks = () => {
  const [tabValue, setTabValue] = useState("");

  const { tab, indicator, tabContainer } = useStyles();
  const location = useLocation();

  useEffect(() => {
    const splitPathName = location.pathname.split("/");
    const rootPathName = splitPathName[1];
    setTabValue(rootPathName);
  }, [location.pathname]);

  return (
    <Tabs
      centered
      className={tabContainer}
      value={tabValue}
      indicatorColor="primary"
      textColor="primary"
      TabIndicatorProps={{
        children: <div></div>,
        className: indicator,
      }}
    >
      <Tab
        label="Home"
        value=""
        disableRipple
        to="/"
        component={Link}
        className={tab}
      />
      <Tab
        label="Login"
        disableRipple
        to="/login"
        value="login"
        component={Link}
        className={tab}
      />
      <Tab
        label="Signup"
        disableRipple
        to="/signup"
        value="signup"
        component={Link}
        className={tab}
      />
    </Tabs>
  );
};

export default Navlinks;

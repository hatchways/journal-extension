import { AppBar, Grid, Typography, makeStyles } from "@material-ui/core";

import NavLinks from "./NavLinks";
// @ts-nocheck
import React from "react";
import { Theme } from "@mui/material";

//CSS styles
const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "row",
    height: "6rem",
    alignItems: "center",
    padding: "0 2rem 0 2rem",
    borderBottom: "1px solid #E0E0E0",
    zIndex: theme.zIndex.drawer + 1,
  },
  navbarHeight: {
    height: "6rem",
  },
}));

const Navbar = () => {
  const { navbar, navbarHeight } = useStyles();

  return (
    <>
      <AppBar
        className={navbar}
        color="secondary"
        elevation={0}
        position="fixed"
      >
        <Grid container>
          <Grid item>
            <Typography>Hatchy-Journal</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <NavLinks />
          </Grid>
        </Grid>
      </AppBar>
      <div className={navbarHeight}></div>
    </>
  );
};

export default Navbar;

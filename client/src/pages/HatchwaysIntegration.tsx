import { Button, Input, Typography, makeStyles } from "@material-ui/core";

import React from "react";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 160,
    height: 160,
  },
});

const HatchwaysIntegration = (): React.ReactElement => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <img className={classes.logo} src="https://hatchways.io/logo.png" />
        <Typography variant="h6">Connect to Hatchways</Typography>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};
export default HatchwaysIntegration;

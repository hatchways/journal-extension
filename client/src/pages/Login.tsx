import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { login } from "../store/thunks";
import { useAppDispatch } from "../store";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  const handleLogin = async () => {
    try {
      await dispatch(login({ email: state.email, password: state.password }));
      navigate("/");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "There was an error. Please try again",
      }));
    }
  };

  const shouldDisableSubmit = () => {
    return !(state.email && state.password);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box padding={16}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            fullWidth
            label="email"
            variant="outlined"
            name="email"
            value={state.email || ""}
            type="text"
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="password"
            required
            variant="outlined"
            name="password"
            value={state.password || ""}
            type="text"
            onChange={handleChange}
          />
        </Grid>
        {state.error && (
          <Typography variant="subtitle1" color="error">
            {state.error}
          </Typography>
        )}
        <Button
          type="submit"
          onClick={handleLogin}
          variant="contained"
          color="primary"
          size="large"
          disabled={shouldDisableSubmit()}
        >
          Login
        </Button>
      </Grid>
    </Box>
  );
};

export default Login;

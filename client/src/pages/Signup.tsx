import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Grid, Button, Typography } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const handleSignup = async () => {
    try {
      await signup(state.email, state.password);
      navigate("/");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "There was an error. Please try again",
      }));
    }
  };

  const shouldDisableSubmit = () => {
    return (
      !(state.email && state.password && state.confirmPassword) &&
      state.password !== state.confirmPassword
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            required
            name="confirmPassword"
            value={state.confirmPassword || ""}
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
          onClick={handleSignup}
          variant="contained"
          color="primary"
          size="large"
          disabled={shouldDisableSubmit()}
        >
          Signup
        </Button>
      </Grid>
    </Box>
  );
};

export default Signup;

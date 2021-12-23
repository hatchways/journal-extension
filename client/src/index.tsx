import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { SnackBarProvider } from "./hooks/useSnackbar";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./themes/theme";

ReactDOM.render(
  <SnackBarProvider>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </SnackBarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

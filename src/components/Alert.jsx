import { Snackbar } from "@mui/material";
import React from "react";
import { CryptoState } from "../CryptoContext";
import MuiAlert from "@mui/material/Alert";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        elevation={10}
        severity={alert.type}
        variant="filled"
        onClose={handleClose}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

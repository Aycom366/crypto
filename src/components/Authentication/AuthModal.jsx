import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps, TabPanel } from "../Tabs";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { CryptoState } from "../../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  maxWidth: 400,
  transform: "translate(-50%, -50%)",
  color: "white",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

const styles = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  fontSize: 20,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const { setAlert } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button
          variant="contained"
          style={{
            width: 85,
            height: 40,
            backgroundColor: "#eebc1d",
          }}
          onClick={handleOpen}
        >
          Login
        </Button>
        <Modal
          style={{ width: "80%" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Login handleClose={handleClose} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUp handleClose={handleClose} />
            </TabPanel>
            <Box sx={styles} px={3}>
              <span>OR</span>
              <GoogleButton
                style={{ marginTop: "1.2rem", width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

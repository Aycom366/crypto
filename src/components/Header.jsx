import React from "react";
import {
  Toolbar,
  Container,
  Typography,
  MenuItem,
  Select,
  makeStyles,
  AppBar,
  createTheme,
  ThemeProvider,
} from "./files";
import { CryptoState } from "../CryptoContext";

import { useHistory } from "react-router-dom";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles({
  title: {
    flex: 1,
    color: "gold",
    fontWeight: "bolder",
    cursor: "pointer",
  },
});

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currency, setCurrency, user } = CryptoState();

  //creating a dark theme schema for header
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h4"
              onClick={() => history.push("/")}
              className={classes.title}
            >
              Crypto
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;

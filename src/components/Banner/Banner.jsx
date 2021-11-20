import React from "react";
import { Container, Typography, makeStyles } from "../files";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            style={{ fontWeight: "bold", marginBottom: 15 }}
            variant="h2"
          >
            Crypto Info
          </Typography>
          <Typography
            style={{ color: "darkgrey", marginBottom: 15 }}
            variant="subtitle"
          >
            Get all the info regarding your favorite Crypto Currencies
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;

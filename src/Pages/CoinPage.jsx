import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinChart from "../components/Banner/CoinChart";
import { styled } from "@mui/material/styles";
import { Button, LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReactHtmlParser from "react-html-parser";
import { numberWithComma } from "../components/Banner/Carousel";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../config/firebaseConfig";

const useStyles = makeStyles({
  heading: {
    fontWeight: "bols",
    marginBottom: 20,
  },
  description: {
    width: "100%",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
});

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignitems: "start",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchlist, setAlert } = CryptoState();
  const classes = useStyles();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  //check whther coinis in watchinglist
  const inWatchList = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    //adding watchlist into collection, with userid coz we made it complusory in the rules
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to the watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: false,
        mesage: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchList = async () => {
    //adding watchlist into collection, with userid coz we made it complusory in the rules
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: false,
        mesage: error.message,
        type: "error",
      });
    }
  };

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>

        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithComma(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {" "}
              {symbol}{" "}
              {numberWithComma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              onClick={inWatchList ? removeFromWatchList : addToWatchlist}
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchList ? "#ff0000" : "#eebc1d",
              }}
              variant="contained"
            >
              {inWatchList ? "Remove From Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </MarketData>
      </Sidebar>
      {/* chart */}
      <CoinChart coin={coin} />
    </Container>
  );
};

export default CoinPage;

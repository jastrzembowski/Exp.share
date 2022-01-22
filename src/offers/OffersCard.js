import { CardActions, CardContent } from "@material-ui/core";
import React, { useState, forwardRef } from "react";
import Card from "@material-ui/core/Card";
import Button from "../AddNewOfferForm/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OfferCard(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const difficultyLevel = (level) => {
    let color = "";
    let stars = "";

    if (level === "podstawowa") {
      color = "#C86E0D";
      stars = "★☆☆";
    }

    if (level === "srednia") {
      color = "#731515";
      stars = "★★☆";
    }

    if (level === "wyzsza") {
      color = "#12105B";
      stars = "★★★";
    }
    return (
      <p
        style={{
          textAlign: "center",
          margin: "2px",
        }}
      >
        Poziom nauczania:{" "}
        <span
          style={{
            fontSize: "1.5rem",
            color: `${color}`,
          }}
        >
          {stars}
        </span>
      </p>
    );
  };

  const levelName = (level) => {
    let label = "";

    if (level === "podstawowa") {
      label = "Szkoła Podstawowa";
    }
    if (level === "srednia") {
      label = "Szkoła Średnia";
    }
    if (level === "wyzsza") {
      label = "Szkoła Wyższa";
    }
    return <span>{label}</span>;
  };
  return (
    <div className="offers-card_container">
      <Card
        className="OffersContainer"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "360px",
        }}
      >
        <CardContent style={{ height: "70%", marginBottom: "20px" }}>
          <h2
            className="title"
            style={{
              fontSize: "25px",
              marginTop: "-2px",
              lineHeight: "20px",
              color: "#0A0A40",
              textAlign: "center",
              fontFamily: "Lobster",
            }}
          >
            {props.offer.name}
          </h2>
          <p style={{ textAlign: "center", fontSize: "15px" }}>
            Cena: {props.offer.price}{" "}
          </p>
          {difficultyLevel(props.offer.level)}
          <div className="imgContainer">
            <img
              src={props.offer.imageUrl}
              className="offerImage"
              alt="offerImage"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
          </div>
        </CardContent>
        <CardActions className="cardActions" style={{ display: "grid" }}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
              paddingTop: "16px",
            }}
          >
            <Button
              text="Zobacz więcej!"
              variant="contained"
              type="submit"
              onClick={handleClickOpen}
              style={{
                marginBottom: "5px",
                backgroundColor: "#731515",
                color: "white",
                fontFamily: "Raleway",
              }}
            />
          </div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              <h1
                style={{
                  fontFamily: "Lobster",
                  textAlign: "center",
                  marginTop: "3px",
                  marginBottom: "0px",
                  color: "#0A0A30",
                }}
              >
                {" "}
                {props.offer.name}
              </h1>
            </DialogTitle>
            <DialogContent>
              <img
                src={props.offer.imageUrl}
                className="offer-image"
                alt="offerImage"
              />
              <DialogContentText style={{ fontFamily: "Raleway" }}>
                <b>Poziom nauczania:</b> {levelName(props.offer.level)}
                <br />
                <b>Cena:</b> {props.offer.price} zł
                <br />
                <b>Opis:</b> {props.offer.description}
                <br />
                <b>Miasto:</b> {props.offer.city}
                <br />
                <b>Nr. telefonu: {props.offer.phone}</b>
                <br />
                <b>Adres email: {props.offer.email}</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button
                variant="contained"
                color="primary"
                text="Zobacz na mapie"
                component={Link}
                to="/mapa"
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#151818",
                  color: "white"
                }}
              /> */}
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                text="Wróć"
                style={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: "#731515",
                  color: "white",
                  fontFamily: "Raleway",
                  letterSpacing: "1px"
                }}
              />
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </div>
  );
}

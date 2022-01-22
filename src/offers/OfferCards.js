import React from "react";
import OfferCard from "./OffersCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDownAlt,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RangeSlider from "./DifficultySliderbar";
const DATABASE_URL = "https://expshare-34cb2-default-rtdb.firebaseio.com/";

export default class Cards extends React.Component {
  state = {
    offers: [],
    sorter: undefined,
    sortDirection: "",
    name: "",
    price: "",
    level: ["podstawowa", "gimnazjum", "srednia", "wyzsza"],
    levelSortDirection: "",
  };
  

  componentDidMount() {
    fetch(`${DATABASE_URL}/offers.json`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        this.setState({
          offers: formattedData,
        });
      });
  }

  handleChange = (event, newValue) => {
    let newValueStringify = JSON.stringify(newValue);
 
      if (newValueStringify === JSON.stringify([1, 3])) {
        this.setState({
          level: ["podstawowa", "srednia", "wyzsza",],
        });
      }    if (newValueStringify === JSON.stringify([1, 2])) {
        this.setState({
          level: ["podstawowa", "srednia", ],
        });
      }    if (newValueStringify === JSON.stringify([1, 1])) {
        this.setState({
          level: ["podstawowa",],
        });
      }    if (newValueStringify === JSON.stringify([2, 3])) {
        this.setState({
          level: ["srednia", "wyzsza"],
        });
      }    if (newValueStringify === JSON.stringify([2, 2])) {
        this.setState({
          level: [ "srednia"],
        });
      }    if (newValueStringify === JSON.stringify([3, 3])) {
        this.setState({
          level: ["wyzsza"],
        });
      }
    }
  sortByName = () => {
    if (this.state.sortDirection === "alphabetically") {
      this.setState(() => ({
        sorter: (a, b) => b.price.localeCompare(a.price),
        sortDirection: "revesedAlphabetically",
      }));
    } else {
      this.setState(() => ({
        sorter: (a, b) => a.price.localeCompare(b.price),
        sortDirection: "alphabetically",
      }));
    }
  };

  sortByLevel = () => {
    if (this.state.levelSortDirection === "fromLowToHigh") {
      this.setState(() => ({
        sorter: (a, b) => b.level.localeCompare(a.level),
        levelSortDirection: "fromHighToLow",
      }));
    } else {
      this.setState(() => ({
        sorter: (a, b) => a.level.localeCompare(b.level),
        levelSortDirection: "fromLowToHigh",
      }));
    }
  };

  handleNameChange = (name) => {
    this.setState({
      name: name.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="background-coloring-div">
          <div className="offers-navigation-bar" >
          <RangeSlider
              handleChange={this.handleChange}
              style={{
                gridArea: "slider",
              }}
            />
            <TextField
              label="Filtruj po nazwie"
              value={this.state.name}
              onChange={(name) => {
                this.handleNameChange(name);
              }}
              InputLabelProps={{
                style: { color: "white",   fontFamily: "Raleway", letterSpacing: "1px"  } 
             }}
             InputProps={{
               style: { color: "white",   fontFamily: "Raleway" , letterSpacing: "1px" }
             }}
              variant="filled"
              style={{
                gridArea: "filterInput",
                backgroundColor: "#731515",
                color: "white",
                borderRadius: "3px",
                fontFamily: "Raleway",
                margin:"2px",
                letterSpacing: "1px"
              }}
            />
           
            <Button
              variant="contained"
              color="secondary.light"
          
              style={{
                gridArea: "sortByName",
                backgroundColor: "#731515",
                color: "white",
                padding: "15px",
                textTransform: "none",
                borderRadius: "3px",
                fontFamily: "Raleway",
                margin:"2px",
                letterSpacing: "1px"
              }}
              onClick={this.sortByName}
            >
              {this.state.sortDirection === "alphabetically" ? (
                <FontAwesomeIcon icon={faSortAlphaDown} />
              ) : (
                <FontAwesomeIcon icon={faSortAlphaUp} />
              )}
              Sortuj według ceny
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#731515",
               padding: "15px",
                color: "white",
                gridArea: "sortByLevel",
                textTransform: "none",
                borderRadius: "3px",
                fontFamily: "Raleway",
                margin: "2px",
                letterSpacing: "1px"
              }}

              onClick={this.sortByLevel}
            >
              {this.state.levelSortDirection === "fromLowToHigh" ? (
                <FontAwesomeIcon icon={faSortAmountDownAlt} />
              ) : (
                <FontAwesomeIcon icon={faSortAmountUp} />
              )}
              Sortuj według poziomu nauczania
            </Button>
          </div>
        </div>
        <div className="offers-dashboard" >
          {this.state.offers
            .sort(this.state.sorter)
            .filter((offer) => offer.name.includes(this.state.name))
            .filter((offer) => {
              if (this.state.level.includes(offer.level)) {
                return offer;
              }
            })
            .map((offer) => (
              <OfferCard offer={offer} />
            ))}
        </div>
      </>
    );
  }
}

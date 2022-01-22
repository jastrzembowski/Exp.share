import React from "react";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "./Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const DATABASE_URL = "https://expshare-34cb2-default-rtdb.firebaseio.com/";

export default class AddNewOfferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: uuidv4(),
      price: "",
      phone: "",
      level: "",
      email: "",
      city: "",
      imageUrl: "https://image.pngaaa.com/689/2189689-middle.png",
      description: "",
    };
    this.initialState = {
      name: "",
      id: uuidv4(),
      price: "",
      phone: "",
      level: "",
      email: "",
      city: "",
      imageUrl: "https://image.pngaaa.com/689/2189689-middle.png",
      description: "",
    };
  }
  handleFormReset = () => {
    this.setState({ state: this.initialState });
    console.log(this.initialState);
  };
  handleOnChange = (event) => {
    console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    fetch(`${DATABASE_URL}/offers.json`, {
      method: "POST",
      body: JSON.stringify(this.state),
    }).then(() => {
      this.props.setOpenPopup();
    });
  };

  onFileLoad = (e) => {
    const file = e.currentTarget.files[0];
    let fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
    }
    fileReader.onload = () => {
      this.setState({
        imageUrl: fileReader.result,
      });
    };
    fileReader.onabort = () => {
      alert("Reading Aborted");
    };
    fileReader.onerror = () => {
      alert("Reading ERROR!");
    };
  };
  render() {
    const { setOpenPopup } = this.props;

    return (
      <form
        className={this.classes}
        onSubmit={this.handleOnSubmit}
        onReset={this.handleFormReset}
        style={{ fontSize: "small" }}
      >
        <div class="name-container">
          <TextField
            variant="outlined"
            label="Jak się nazywasz"
            value={this.state.title}
            name="name"
            onChange={this.handleOnChange}
            required
            inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            InputLabelProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            style={{ margin: "0px 5px 0px 0px" }}
          />
          <TextField
            variant="outlined"
            label="Cena za godzinę"
            name="price"
            value={this.state.price}
            onChange={this.handleOnChange}
            inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            InputLabelProps={{ style: { fontSize: 11, fontFamily: "Raleway" } }}
            required
            type="number"
            style={{ margin: "0px 0px 0px 5px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            lineHeight: 1.1,
            width: "100%",
            marginTop: "10px",
          }}
        >
          <FormControl
            component="fieldset"
            style={{ display: "flex", fontFamily: "Raleway" }}
          >
            <FormLabel
              component="legend"
              style={{
                display: "inline",
                color: "#0A0A13",
                fontFamily: "Raleway",
              }}
            >
              Poziom nauczania{" "}
            </FormLabel>
            <RadioGroup
              aria-label="level"
              name="level"
              value={this.state.level}
              onChange={this.handleOnChange}
              style={{ display: "inline", fontFamily: "Raleway" }}
              inputProps={{ style: { fontSize: 11, fontFamily: "Raleway" } }}
              InputLabelProps={{
                style: { fontSize: 11, fontFamily: "Raleway" },
              }}
            >
              <FormControlLabel
                value="podstawowa"
                control={<Radio />}
                label="Szkoła Podstawowa"
                inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
                InputLabelProps={{
                  style: { fontSize: 11, fontFamily: "Raleway" },
                }}
              />
              <FormControlLabel
                value="srednia"
                control={<Radio />}
                label="Szkoła Średnia"
                inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
                InputLabelProps={{
                  style: { fontSize: 11, fontFamily: "Raleway" },
                }}
              />
              <FormControlLabel
                value="wyzsza"
                control={<Radio />}
                label="Szkoła Wyższa"
                inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
                InputLabelProps={{
                  style: { fontSize: 11, fontFamily: "Raleway" },
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            lineHeight: 1.1,
            width: "100%",
            marginTop: "10px",
          }}
        ></div>
        <h2 style={{ color: "#0A0A30" }}>Dane kontaktowe</h2>
        <div className="name-container">
          <TextField
            variant="outlined"
            label="W jakim mieście?"
            name="city"
            value={this.state.city}
            onChange={this.handleOnChange}
            required
            inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            InputLabelProps={{ style: { fontSize: 11, fontFamily: "Raleway" } }}
            type="text"
          />
          <TextField
            variant="outlined"
            label="Podaj numer telefonu"
            value={this.state.phone}
            name="phone"
            style={{ marginLeft: "10px" }}
            onChange={this.handleOnChange}
            required
            inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            InputLabelProps={{ style: { fontSize: 11, fontFamily: "Raleway" } }}
            type="tel"
          />
          <TextField
            variant="outlined"
            label="Podaj adres email."
            value={this.state.email}
            style={{ marginLeft: "10px" }}
            name="email"
            onChange={this.handleOnChange}
            required
            inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            InputLabelProps={{ style: { fontSize: 11, fontFamily: "Raleway" } }}
            type="email"
          />
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <TextField
            variant="outlined"
            label="Opisz się"
            value={this.state.description}
            style={{ marginTop: "10px", width: "100%" }}
            onChange={this.handleOnChange}
            name="description"
            required
            inputProps={{ style: { fontSize: 13, fontFamily: "Raleway" } }}
            InputLabelProps={{ style: { fontSize: 11, fontFamily: "Raleway" } }}
          />
        </div>
        <div
          className="draggable-container"
          style={{
            backgroundImage: `url(${this.state.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <input
            className="button"
            type="file"
            value={undefined}
            name="imageUrl"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={this.onFileLoad}
            onChange={this.onFileLoad}
            style={{ width: "100%" }}
          />
          <div className="file-browser-container"></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            component="div"
            type="submit"
            text="Dodaj"
            style={{
              width: "100px",
              margin: "3px",
              color: "#E3DEBE",
              backgroundColor: "#0A0A30",
              fontFamily: "Raleway",
              letterSpacing: "1px",
            }}
            onClick={this.handleOnSubmit}
          />
          <Button
            component="div"
            type="reset"
            color="primary"
            text="Resetuj"
            style={{
              width: "100px",
              margin: "3px",
              color: "#E3DEBE",
              backgroundColor: "#0A0A30",
              fontFamily: "Raleway",
              letterSpacing: "1px",
            }}
            onClick={this.handleFormReset}
          />
        </div>
      </form>
    );
  }
}

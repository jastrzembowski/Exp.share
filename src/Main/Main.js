import React, { Component } from "react";
import ButtonHolder  from "../LoginRegister/ButtonHolder";
import bg1 from "../images/bg1.jpg";
import bg2 from "../images/bg2.jpg";
import bg3 from "../images/bg3.jpg";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgStyle: {
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        backgroudSize: "cover",
        paddingRight: "100%",
      },
    };
  }
  componentWillMount() {
    const pictureArray = [bg1, bg2, bg3];
    const randomIndex = Math.floor(Math.random() * pictureArray.length);
    const selectedPicture = pictureArray[randomIndex];

    this.setState({
      bgStyle: {
        background: ` url(${selectedPicture})`,
        height: "100vh",
        width: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingRight: "100%",
        position: "fixed",
        filter: " brightness(65%) grayscale(10%)",
        top: "0px",
      },
    });
  }
  render() {
    return (
      <>
        <div className="main-holder" >
          <h1 className="main-header">Ucz się z nami!</h1>
          <div>
          <ButtonHolder/>
          </div>
          <div style={this.state.bgStyle} className="bg">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "15vw",
                width: "100vw",
                overflow: "hidden",
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}

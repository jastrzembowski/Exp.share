import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

export default function RangeSlider({ handleChange }) {
  const marks = [
    {
      value: 1,
      label: "Szkoła Podstawowa",
    },
    {
      value: 2,
      label: "Szkoła Średnia",
    },
    {
      value: 3,
      label: "Szkoła Wyższa",
    },
  ];
  return (
    <div className="slider">
      <Typography
        id="range-slider"
        style={{
          color: "#731515",
          width: "300px",
          fontFamily: "Raleway",
          letterSpacing: "1px",
        }}
        gutterBottom
      >
        Poziom nauczania
      </Typography>
      <Slider
        defaultValue={[1, 3]}
        onChange={handleChange}
        className="slider"
        valueLabelDisplay="off"
        aria-labelledby="discrete-slider"
        marks={marks}
        step={1}
        min={1}
        max={3}
        style={{
          color: "#731515",
        }}
      />
    </div>
  );
}

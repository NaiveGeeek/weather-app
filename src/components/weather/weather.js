import React, { Component } from "react";
import "./weather.css";
import WeatherDetail from "./WeatherDeatail";
import Forecast from "./Forecast";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="weather-container">
        <WeatherDetail></WeatherDetail>
        <Forecast></Forecast>
      </div>
    );
  }
}

export default Weather;

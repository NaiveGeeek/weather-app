import React, { Component } from "react";
import { weatherType, dayName } from "../../constants/constants";
import { connect } from "react-redux";
import { getTempreture } from "../../utils";
import WeatherLoader from "../../weatherLoader/weatherLoader";

class Forecast extends Component {
  getForcastElements = (weather) => {
    const dailyForcast = weather.daily;
    const celcius = this.props.weather.celcius;
    const elements = dailyForcast.map((data, index) => {
      if (index > 0 && index < 5) {
        const day = new Date(data.dt * 1000).getDay();
        return (
          <div className="forecast-div" key={index}>
            <p className="forecast-section">{dayName[day]}</p>
            <p className="forecast-section forecast-temp">
              {getTempreture(data.temp.day, celcius)} &#176;{" "}
            </p>
            <div className="current-weather">
              <span className="weather-icon">
                <img
                  src={weatherType[data.weather[0].id].day}
                  alt="weather-type 🌞 "
                ></img>
              </span>
            </div>
            <p className="current-weather-title">
              {data.weather[0].description}
            </p>
          </div>
        );
      }
      return null;
    });
    return elements;
  };

  render() {
    const { weather, isLoading } = this.props.weather;
    if (isLoading) {
      return (
        <div className="weather container">
          <WeatherLoader label="Fetching Data ...."></WeatherLoader>
        </div>
      );
    }
    return (
      <div className="forecast container">
        {this.getForcastElements(weather)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  };
};
export default connect(mapStateToProps)(Forecast);

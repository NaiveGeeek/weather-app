import React, { Component } from "react";
import { weatherType, dayName } from "../../constants/constants";
import { connect } from "react-redux";
import { getTempreture } from "../../utils";
import WeatherLoader from "../../weatherLoader/weatherLoader";

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [
        {
          day: 0,
          temp: 25,
          weather: 800,
          weatherDetail: "Clear Sky",
        },
        {
          day: 1,
          temp: 27,
          weather: 801,
          weatherDetail: "Cloudy",
        },
        {
          day: 2,
          temp: 35,
          weather: 800,
          weatherDetail: "Clear Sky",
        },
        {
          day: 3,
          temp: 29,
          weather: 801,
          weatherDetail: "Cloudy",
        },
      ],
    };
  }

  getElements = () => {
    const elements = this.state.forecast.map((data, index) => {
      return (
        <div className="forecast-div" key={index}>
          <p className="forecast-section">{dayName[data.day]}</p>
          <p className="forecast-section forecast-temp">{data.temp} &#176; </p>
          <div className="current-weather">
            <span className="weather-icon">
              <img src={weatherType[data.weather].day} alt="weather-type 🌞 "></img>
            </span>
          </div>
          <p className="current-weather-title">{data.weatherDetail}</p>
        </div>
      );
    });
    return elements;
  };
  getForcastElements = (weather)=>{
    const dailyForcast = weather.daily;
    const celcius = this.props.weather.celcius;
    const elements = dailyForcast.map((data, index) => {
      console.log(data.weather[0].id);
      if(index>0 && index<5){
      const day = new Date(data.dt*1000).getDay();
      return (
        <div className="forecast-div" key={index}>
          <p className="forecast-section">{dayName[day]}</p>
          <p className="forecast-section forecast-temp">{getTempreture(data.temp.day,celcius)} &#176; </p>
          <div className="current-weather">
            <span className="weather-icon">
              <img src={weatherType[data.weather[0].id].day} alt="weather-type 🌞 "></img>
            </span>
          </div>
          <p className="current-weather-title">{data.weather[0].description}</p>
        </div>
      );}
      return null;
    });
    return elements;
  }

  render() {
    const {weather,isLoading} =this.props.weather;
    if(isLoading){
      return  <div className="weather container">
        <WeatherLoader label="Fetching Data ...."></WeatherLoader>
      </div>
      }
    return <div className="forecast container">{this.getForcastElements(weather)}</div>;
  }
}
const mapStateToProps = (state)=>{
   return{
     weather : state.weather
   }
}
export default connect(mapStateToProps)(Forecast);

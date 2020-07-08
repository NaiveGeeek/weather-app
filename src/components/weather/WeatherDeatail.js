import React, { Component } from "react";
import {weatherType} from '../../constants/constants';
import realfeel from '../../assets/realfeel.svg';
import wind from '../../assets/wind.svg';
import { connect } from "react-redux";
import WeatherLoader from "../../weatherLoader/weatherLoader";
import { getTimeOfDay, getTempreture } from "../../utils";
import { changeTempUnit } from "../../action/action";

class WeatherDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onRadioButtonClick =(event)=>{
   const target = event.target;
   const celcius = target.value ==="C"?true:false;
   this.props.setTempUnit(celcius);
  }

  render() {
    const {location} =this.props.location;
    const {weather,isLoading,celcius} =this.props.weather;
    if(isLoading){
      return  <div className="weather container">
        <WeatherLoader label="Fetching Data ...."></WeatherLoader>
      </div>
    }
    const time = getTimeOfDay(weather.current);
    const id = weather.current.weather[0].id;
    const description = weather.current.weather[0].description;
    const temp = getTempreture(weather.current.temp,celcius);
    const windSpeed = weather.current.wind_speed;
    const feelsLike = getTempreture(weather.current.feels_like,celcius);
    return (
      <div className="weather container">
        <div className="right-side-weather">
        <p className="city-name">{location.city}</p>
          <div className="current-weather">
            <span className="weather-icon">
              
              <img src={weatherType[id][time]} alt= "weather-type 🌞 "></img>
            </span>
          </div>
          <p className="current-weather-title">{description}</p>
        </div>
        <div className="left-side-weather">
          <div className="radio-group">
            <label className="radio-container">
              <input
                type="radio"
                className="custom-radio"
                checked={celcius}
                name="temperature-unit"
                value="C"
                onChange={this.onRadioButtonClick}
              />
              <span className="unit-name-background left-radio">&#8451;</span>
            </label>
            <label className="radio-container">
              <input
                type="radio"
                name="temperature-unit"
                className="custom-radio"
                checked={!celcius}
                value="F"
                onChange={this.onRadioButtonClick}
              />
              <span className="unit-name-background right-radio">&#8457;</span>
            </label>
          </div>
          <div className="current-temprature">
            {temp} <span className="degree-symbole">&#176;</span>
          </div>
          <div className="feels-like"> 
            <div className="feels-icon"><img src={realfeel} alt="icon"></img></div>
            <div className="feels-details"> {feelsLike} <span className="feels-degree-symbole">&#176;</span> <span className="feels-like-text">Real Feel</span> </div>
          </div>
          <div className="feels-like" style={{marginTop:"10px"}}> 
            <div className="feels-icon"><img src={wind} alt="icon"></img></div>
            <div className="feels-details"> {windSpeed} <span className="wind-speed-unit"> m/s</span></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    weather : state.weather,
    location:state.location,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    setTempUnit :(celcius)=>dispatch(changeTempUnit(celcius))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(WeatherDetail);

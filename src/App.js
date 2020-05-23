import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/searchbar/searchbar";
import Weather from "./components/weather/weather";
import { fetchWeather } from "./action/action";
import { connect } from "react-redux";
// import WeatherLoader from './weatherLoader/weatherLoader';

class App extends Component {
  componentDidMount(){
   const location = this.props.location;
   this.props.fetchWeather(location.lat,location.lon);
  }
  render() {
   const {darkMode} = this.props.app;
    return (

        <div className={`App ${darkMode?"night":"light"}`}>
          <SearchBar></SearchBar>
          <Weather></Weather>
        </div>
      
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    location:state.location,
    app:state.app,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    fetchWeather :(lat,lon)=>dispatch(fetchWeather(lat,lon)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (App);

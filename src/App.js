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
    return (

        <div className="App">
          <SearchBar></SearchBar>
          <Weather></Weather>
        </div>
      
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    location:state.location
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    fetchWeather :(lat,lon)=>dispatch(fetchWeather(lat,lon)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (App);

import React, { Component } from "react";
import "./searchbar.css";
import { MdLocationOn } from "react-icons/md";
import loader from "../../assets/loader.svg";

import {
  highLightText,
  httpApi,
  baseLocationURL,
  queryLocationUrl,
  throttle,
  debounce,
} from "../../utils";
import { getLocation, getLocationError, fetchWeather, changeTheme } from "../../action/action";
import { connect } from "react-redux";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      activeSuggestionIndex: 0,
      suggestions: [],
      userInput: "",
      showSuggestions: false,
      isLoading: false,
    };
    this.throttle = throttle(this.callback, 200);
    this.debounce = debounce(this.callback, 200);
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState(
      {
        userInput: value,
      },
      () => {
        if (this.state.userInput.trim()) {
          this.debounce(this.state.userInput);
        } else {
          this.setState({ showSuggestions: false });
        }
      }
    );
  };
  onKeyDown = (e) => {
    const { suggestions, showSuggestions, activeSuggestionIndex } = this.state;
    if (showSuggestions && e.keyCode === 13 && suggestions.length > 0) {
      this.setState(
        {
          userInput: suggestions[activeSuggestionIndex].matching_full_name,
          showSuggestions: false,
        },
        () => {
          const data = suggestions[activeSuggestionIndex];
          this.locationSetFunction(data);
        }
      );
    } else if (showSuggestions && e.keyCode === 38) {
      let activeIndex =
        activeSuggestionIndex === 0
          ? activeSuggestionIndex
          : activeSuggestionIndex - 1;
      if (activeIndex !== activeSuggestionIndex) {
        this.setState({
          activeSuggestionIndex: activeIndex,
        });
      }
    } else if (showSuggestions && e.keyCode === 40) {
      let activeIndex =
        activeSuggestionIndex === suggestions.length - 1
          ? activeSuggestionIndex
          : activeSuggestionIndex + 1;
      if (activeIndex !== activeSuggestionIndex) {
        this.setState({
          activeSuggestionIndex: activeIndex,
        });
      }
    }
  };
  callback = (value) => {
    let location = value;
    this.setState({ isLoading: true });
    httpApi(baseLocationURL + location + queryLocationUrl)
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong !! " + response.status);
        return response.json();
      })
      .then((data) => {
        this.updateState(data["_embedded"]["city:search-results"], value);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false, activeSuggestionIndex: 0 });
      });
  };
  updateState = (data = [], value) => {
    let showSuggestions = false;
    const filteredData = data.filter((data) => {
      return (
        data.matching_full_name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    });
    if (this.state.userInput.trim()) showSuggestions = true;
    this.setState({
      suggestions: filteredData,
      showSuggestions: showSuggestions,
      activeSuggestionIndex: 0,
    });
  };
  handleClick = (data) => {
    this.setState(
      {
        userInput: data.matching_full_name,
        showSuggestions: false,
      },
      () => {
        this.locationSetFunction(data);
      }
    );
  };
  locationSetFunction = (data) => {
    const city = data.matching_full_name.split(",")[0];
    const fullName = data.matching_full_name;
    const { latitude: lat, longitude: lon } = data["_embedded"][
      "city:item"
    ].location.latlon;
    const location = { city, fullName, lat, lon };
    this.props.setLocation(location);
    this.props.fetchWeather(lat,lon);
  };
  getSuggestedElement = () => {
    const { suggestions, activeSuggestionIndex } = this.state;
    let elements = null;
    if (suggestions.length > 0) {
      elements = suggestions.map((data, index) => {
        return (
          <span
            onClick={() => {
              this.handleClick(data);
            }}
            key={index}
            className={activeSuggestionIndex === index ? "active-span" : ""}
          >
            <span className="location-icon">
              <MdLocationOn></MdLocationOn>
            </span>

            <span style={{ display: "inline-block" }}>
              {highLightText(
                data.matching_full_name,
                this.state.userInput,
                (match, i) => (
                  <span className="highlight" key={match + i}>
                    {match}
                  </span>
                )
              )}
            </span>
          </span>
        );
      });
    } else {
      elements = <span>No Match Found !!! :) </span>;
    }
    return elements;
  };
 handleThemeChange = (event)=>{
    const target = event.target;
    this.props.changeTheme(target.checked);
 }
  render() {
    const {darkMode} = this.props.app;
    return (
      <div className="search-div container">
        <div className="project-title">
          <h3>Weather App</h3>
        </div>
        <div className="autocomplete-input">
          <input
            className="city-input"
            placeholder="Type City Name..."
            value={this.state.userInput}
            onChange={this.handleChange}
            onKeyDown={this.onKeyDown}
          ></input>
          <span
            className={`${"search-loader"} ${
              this.state.isLoading ? "visible" : "hidden"
            } `}
          >
            <img src={loader} alt="loader"></img>
          </span>
          <div
            className={`autocomplete-result box-shadow ${
              this.state.showSuggestions ? "" : "hidden"
            } `}
          >
            {this.getSuggestedElement()}
          </div>
        </div>
        {/* <button className="search-button">
          <span className="icon">
            <FaSearch className="search-icon"></FaSearch>
          </span>
        </button> */}
        <div className="toggle-theme-div">
          <input className="toggle-theme-switch" onChange={this.handleThemeChange} checked={darkMode} type="checkbox"></input>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    app:state.app
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (data) => dispatch(getLocation(data, false)),
    setLocationError: () => dispatch(getLocationError(true)),
    fetchWeather:(lat,lon)=>dispatch(fetchWeather(lat,lon)),
    changeTheme:(darkMode)=>dispatch(changeTheme(darkMode)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

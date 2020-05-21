import React, { Component } from 'react';
import './weatherLoader.css';

class WeatherLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const label =this.props.label||"Loading ...";
        return (  
        <div className="forecast-loader">
            <div className="forecast__cloudy">
              <div className="forecast__cloudy__sun"></div>
              <div className="forecast__cloudy__cloud forecast__cloudy__cloud--small">
              </div>
              <div className="forecast__cloudy__cloud forecast__cloudy__cloud--normal">
              </div>
            </div>
            <div className="forecast__label">{label}</div>
        </div>
        );
    }
}
 
export default WeatherLoader;
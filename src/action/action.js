import * as actionTypes from "./actionType";
import { httpApi, baseWeatherURL, queryWeatherURL } from "../utils";

export const getWeather = (data, isError) => ({
  type: actionTypes.GET_WEATHER,
  payload: { weather: data, error: isError },
});
export const getLocation = (data, isError) => ({
  type: actionTypes.GET_LOCATION,
  payload: {
    location: data,
    error: isError,
  },
});

export const fetchWeatherStart = () => ({
  type: actionTypes.START_WEATHER_FETCH,
});
export const getWeatherError = (error) => ({
  type: actionTypes.GET_WEATHER_ERROR,
  payload: {
    error,
  },
});
export const changeTempUnit = (celcius)=>({
  type:actionTypes.CHANGE_TEMP_UNIT,
  payload:{celcius}
})
export const getLocationError = (error) => ({
  type: actionTypes.GET_LOCATION_ERROR,
  payload: {
    error,
  },
});

export const fetchWeather = (lat = 23.55, lon = 74.45) => {
  return (dispatch) => {
    dispatch(fetchWeatherStart());
    const location = `lat=${lat}&lon=${lon}`;
    console.log(process.env.WEATHER_API_KEY,process.env);
    const apiId = process.env.REACT_APP_WEATHER_API_KEY;
    httpApi(baseWeatherURL + location + queryWeatherURL + apiId)
      .then((response) => {
        if (response.ok) {return response.json();}
        else {throw new Error("Something went wrong !!!" + response.status)};
      })
      .then((data) => {
        dispatch(getWeather(data, false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getWeatherError(true));
      });
  };
};

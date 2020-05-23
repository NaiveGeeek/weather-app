import * as actionTypes from "../action/actionType";
import { combineReducers } from "redux";
const initalStateWeather = {
  weather: null,
  isLoading: true,
  isError: false,
  celcius: true,
};

const initialStateLocation = {
  location: {
    city: "Banswara",
    lat: 23.54109,
    lon: 74.4425,
    fullName: "Banswara, Rajasthan, India",
  },
  isError: false,
};
const initialStateApp = {
  darkMode: true,
};
const weatherReducer = (state = initalStateWeather, action) => {
  switch (action.type) {
    case actionTypes.START_WEATHER_FETCH: {
      return { ...state, isLoading: true };
    }
    case actionTypes.GET_WEATHER: {
      return {
        ...state,
        weather: action.payload.weather,
        isLoading: false,
        isError: action.payload.error,
      };
    }
    case actionTypes.GET_WEATHER_ERROR: {
      return { ...state, isError: action.payload.error, isLoading: false };
    }
    case actionTypes.CHANGE_TEMP_UNIT: {
      return { ...state, celcius: action.payload.celcius };
    }
    default: {
      return { ...state };
    }
  }
};

const locationReducer = (state = initialStateLocation, action) => {
  switch (action.type) {
    case actionTypes.GET_LOCATION: {
      return {
        location: action.payload.location,
        isError: action.payload.error,
      };
    }
    case actionTypes.GET_LOCATION_ERROR: {
      return { ...state, isError: action.payload.error };
    }
    default: {
      return { ...state };
    }
  }
};
const appReducer = (state = initialStateApp, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_APP_THEME: {
      return { ...state, darkMode: action.payload.darkMode };
    }
    default: {
      return { ...state };
    }
  }
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  app:appReducer,
});

export default rootReducer;

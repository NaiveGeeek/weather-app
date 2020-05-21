export const baseLocationURL = "https://api.teleport.org/api/cities/?search=";
export const queryLocationUrl = "&embed=city:search-results/city:item&limit=10";
export const baseWeatherURL =
  "https://api.openweathermap.org/data/2.5/onecall?";
export const queryWeatherURL = "&exclude=minutely,hourly&appid=";

export const highLightText = (text, pattern, fun) => {
  if (!text) {
    return text;
  }
  let re = new RegExp(pattern, "gi");
  let prev = [];
  const result = text.split(re);
  const match = text.match(re);
  return result.reduce(
    (initial, current, i) => {
      if (!i) {
        return [current];
      }
      return initial.concat(fun(match[i - 1], i), current);
    },
    prev,
    match
  );
};

export const httpApi = (
  url,
  config = {
    method: "GET",
  }
) => {
  return fetch(url, config);
};
export const throttle = (funct, delay = 500) => {
  let timerId;
  function wrapper() {
    let self = this;
    if (timerId) return;
    timerId = setTimeout(() => {
      funct.apply(self, arguments);
      timerId = undefined;
    }, delay);
  }
  return wrapper;
};

export const debounce = (funct, delay = 500) => {
  let timerId;
  function wrapper() {
    let self = this;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      funct.apply(self, arguments);
    }, delay);
  }
  return wrapper;
};
export const getTempreture = (temp, celcius = true) => {
  if (celcius) {
    temp = temp - 273.15;
  } else {
    temp = (temp - 273.15) * 1.8 + 32;
  }

  return Math.round(temp);
};

export const getTimeOfDay = (data)=>{
  const time = new Date().getTime();
  const timeOfDay= data.sunrise*1000<= time && data.sunset*1000>=time?"day":"night";
  return timeOfDay;
}
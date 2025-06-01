const API_KEY = 'bcbaa04c1cefb41909a0ed3b0c79a840';
//Weather Forecasting Project Using React-Developed By Pragin T
// Get latitude and longitude of a city
export const getCoordinates = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch coordinates");

    const data = await res.json();
    if (!data.length) throw new Error("City not found");

    return {
      name: data[0].name,
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } catch (err) {
    throw new Error(`Geolocation error: ${err.message}`);
  }
};

// Get weather forecast by coordinates
export const getWeather = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch weather data");

    const data = await res.json();
    return data.list;
  } catch (err) {
    throw new Error(`Weather API error: ${err.message}`);
  }
};

// Reverse geocoding to get city name from coordinates
export const reverseGeocode = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to reverse geocode");

    const data = await res.json();
    if (!data.length) throw new Error("Location not found");

    return data[0].name;
  } catch (err) {
    throw new Error(`Reverse geocode error: ${err.message}`);
  }
};

// Filter forecast to one entry per day
export const filterFiveDaysForecast = (forecastData) => {
  const uniqueDates = new Set();
  return forecastData.filter((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (uniqueDates.has(date)) return false;
    uniqueDates.add(date);
    return true;
  });
};

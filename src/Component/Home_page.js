import Nav from "./Nav";
import SearchForm from "./Search_form";
import TodayForecast from "./Today_Forecast";
import ForecastDisplay from "./Forecast_Display";
import { useState } from "react";
import {
  ChakraProvider,
  Stack,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  getCoordinates,
  getWeather,
  filterFiveDaysForecast,
  reverseGeocode,
} from "./Api";

// Default empty forecast template
const initialForecastData = {
  city: "(City)",
  list: Array(6).fill({
    dt_txt: " ",
    weather: [{ description: "", main: "" }],
    main: { temp: "_____", humidity: "_____" },
    wind: { speed: "_____" },
  }),
};

// ✅ Correct path for GitHub Pages (images in public/)
export const getGifPath = (main) => {
  const base = process.env.PUBLIC_URL;

  switch (main) {
    case "Clear":
      return `${base}/Sunny.gif`;
    case "Clouds":
      return `${base}/Clouds.gif`;
    case "Rain":
      return `${base}/Rain.gif`;
    case "Drizzle":
      return `${base}/Wind.gif`;
    case "Thunderstorm":
      return `${base}/Thunder.gif`;
    case "Snow":
      return `${base}/Snow.gif`;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      return `${base}/Wind.gif`;
    default:
      return `${base}/Clouds.gif`;
  }
};

function Homepage() {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState(initialForecastData);
  const [weatherGif, setWeatherGif] = useState(`${process.env.PUBLIC_URL}/Clouds.gif`);
  const toast = useToast();

  const handleSearch = async () => {
    try {
      const { name, lat, lon } = await getCoordinates(city);
      const weatherList = await getWeather(lat, lon);
      const filteredData = filterFiveDaysForecast(weatherList);
      setForecastData({ city: name, list: filteredData });

      if (weatherList.length > 0) {
        setWeatherGif(getGifPath(weatherList[0].weather[0].main));
      }
    } catch (err) {
      toast({
        title: "Search Failed",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Unsupported",
        description: "Your browser does not support geolocation.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const cityName = await reverseGeocode(latitude, longitude);
          const weatherList = await getWeather(latitude, longitude);
          const filteredData = filterFiveDaysForecast(weatherList);

          setForecastData({ city: cityName, list: filteredData });
          setCity(cityName);

          if (weatherList.length > 0) {
            setWeatherGif(getGifPath(weatherList[0].weather[0].main));
          }
        } catch (err) {
          toast({
            title: "Location Error",
            description: err.message,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        }
      },
      (error) => {
        toast({
          title: "Search Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        console.error(error);
      }
    );
  };

  const formatDate = (dt_txt) => {
    if (!dt_txt) return "_____";
    const date = new Date(dt_txt);
    if (isNaN(date)) return "_____";
    return date.toDateString();
  };

  return (
    <ChakraProvider>
      <Nav />
      <Stack direction={{ base: "column", md: "column", lg: "row" }} spacing={4}>
        <Box p={4}>
          <SearchForm
            city={city}
            setCity={setCity}
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
          />
        </Box>
        <Box
          backgroundColor="#5372F0"
          padding={0}
          mt={4}
          width={{ base: "90vw", md: "80vw", lg: "67vw" }}
          borderRadius={30}
          mx={{ base: "auto", lg: "initial" }}
          position={{ base: "static", lg: "relative" }}
          left={{ lg: "50%" }}
          transform={{ lg: "translateX(-60%)" }}
        >
          <Text
            color="white"
            fontSize={{ base: "2xl", md: "3xl", lg: "40px" }}
            textAlign={{ base: "center", lg: "left" }}
            ml={{ base: 0, lg: 5 }}
            mt={3}
            fontWeight="bold"
          >
            {forecastData.city} - {formatDate(forecastData.list[0].dt_txt)}
          </Text>
          <TodayForecast data={forecastData.list[0]} gif={weatherGif} />
        </Box>
      </Stack>

      <Box p={4}>
        <ForecastDisplay forecastData={forecastData} />
      </Box>
    </ChakraProvider>
  );
}

export default Homepage;

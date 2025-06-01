import { Box, SimpleGrid, Text, Image } from "@chakra-ui/react";
//Weather Forecasting Project Using React-Developed By Pragin T
import { getGifPath } from "./Home_page";

function ForecastDisplay({ forecastData }) {
  //Used to return string date with default values 
  const formatDate = (dt_txt) => {
    if (!dt_txt) return "Date:";
    const date = new Date(dt_txt);
    if (isNaN(date)) return "Date:";
    return date.toDateString();
  };
  //Ui part of the cards
  return (
    <Box>
      <Text fontSize="1.4rem" textAlign="center" fontWeight="bold" mb={4}>
        5-Day Forecast for {forecastData.city}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4}>
        {forecastData.list.slice(1, 6).map((item, index) => {
          const weatherMain = item.weather[0].main;
          const gifSrc = getGifPath(weatherMain);

          return (
            <Box key={index} p={4} borderRadius="lg" boxShadow="md">
              <Text fontSize="1.2rem" textAlign="center" fontWeight="bold">
                {formatDate(item.dt_txt)}
              </Text>
              <Image
                src={gifSrc}
                alt={item.weather[0].description}
                boxSize="150px"
                objectFit="cover"
                display="block"
                mx="auto"
              />
              <Text fontSize="1.2rem" textAlign="center">
                {item.weather[0].description}
              </Text>
              <Text fontSize="1.2rem" textAlign="center">
                Temperature: {Math.round(item.main.temp)}°C
              </Text>
              <Text fontSize="1.2rem" textAlign="center">
                Humidity: {item.main.humidity}%
              </Text>
              <Text fontSize="1.2rem" textAlign="center">
                Wind Speed: {item.wind.speed} m/s
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default ForecastDisplay;

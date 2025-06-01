import React from "react";
//Weather Forecasting Project Using React-Developed By Pragin T
import { Stack, Text, Box, Flex, Image } from "@chakra-ui/react";
//Ui part of the today forecast box
function TodayForecast({ data, gif }) {
  if (!data) return null;

  return (
    <Box p={4} width="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={6}
      >
        {/* Left side */}
        <Stack spacing={7} color="white" align="flex-start">
          <Text fontSize={22} letterSpacing={1} fontWeight="bold">
            Temperature: {Math.round(data.main.temp)}°C
          </Text>
          <Text fontSize={22} letterSpacing={1} fontWeight="bold">
            Humidity: {data.main.humidity}%
          </Text>
          <Text fontSize={22} letterSpacing={1} fontWeight="bold">
            Wind Speed: {data.wind.speed} m/s
          </Text>
        </Stack>

        {/*Right side with dynamic GIF*/} 
        <Stack spacing={1} align="center" mt={{ base: 4, md: -2 }}>
          <Image
            src={gif}
            alt={data.weather[0].description}
            boxSize="150px"
            objectFit="cover"
          />
          <Text
            color="white"
            fontStyle="italic"
            fontWeight="medium"
            fontSize="2rem"
            textAlign="center"
          >
            {data.weather[0].description}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}

export default TodayForecast;

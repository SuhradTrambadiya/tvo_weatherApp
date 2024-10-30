"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar"; // Navbar component for navigation
import WeatherForecast from "@/components/WeatherForecast"; // Component to display weather forecasts
import CityInputForm from "@/components/CityInputForm"; // Form component to input city names
import { WeatherResponse } from "@/Interface/Weather.Interface"; // Type definition for the weather response
import axios from "axios"; // Importing Axios for making API requests

const App: React.FC = () => {
  // State to manage dark mode toggle
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // State to manage the unit of measurement (metric or imperial)
  const [unit, setUnit] = useState<string>("metric");

  // State to store weather forecast data
  const [forecastData, setForecastData] = useState<WeatherResponse | null>(null);

  // State to track the currently selected city
  const [selectedCity, setSelectedCity] = useState<string>("London");

  // Function to toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Function to fetch weather data from OpenWeather API based on city and unit
  const fetchWeatherData = async (city: string, unit: string) => {
    // Get the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_API_SECRET;

    // Construct the API URL for fetching weather forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
      // Send a request to the weather API using Axios
      const response = await axios.get(url);

      // Update the forecastData state with the fetched data
      setForecastData(response.data); // Directly set the data from the response
    } catch (error) {
      // Log any errors encountered during the API request
      console.error("Error fetching forecast data:", error);
    }
  };

  // Handler function for searching a new city
  const handleSearch = (city: string) => {
    // Update the selected city state
    setSelectedCity(city);

    // Fetch the weather data for the newly selected city
    fetchWeatherData(city, unit);
  };

  // Handler function for changing the measurement unit
  const handleUnitChange = (newUnit: string) => {
    // Update the unit state
    setUnit(newUnit);

    // Fetch weather data for the current city with the new unit
    fetchWeatherData(selectedCity, newUnit);
  };

  // useEffect hook to fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData(selectedCity, unit);
  }, [selectedCity,unit]); // Empty dependency array to run only once when the component mounts

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-black bg-gray-100 ">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onUnitChange={handleUnitChange}
        />

        <div className="container mx-auto mt-4 p-4">
          <CityInputForm darkMode={darkMode} onSearch={handleSearch} />

          {forecastData && (
            <WeatherForecast forecastData={forecastData} unit={unit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

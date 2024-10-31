"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import WeatherForecast from "@/components/WeatherForecast";
import CityInputForm from "@/components/CityInputForm";
import { WeatherResponse, CitySuggestion } from "@/Interface/Weather.Interface";
import axios from "axios";

const App: React.FC = () => {
  // State variables
  const [darkMode, setDarkMode] = useState<boolean>(true); // Track dark mode status
  const [unit, setUnit] = useState<string>("metric"); // Track temperature unit (metric or imperial)
  const [forecastData, setForecastData] = useState<WeatherResponse | null>(
    null
  ); // Store weather forecast data
  const [selectedCity, setSelectedCity] = useState<string>("Toronto"); // Store the currently selected city
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]); // Store city suggestions based on user input
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  ); // Manage debounce timeout for API calls
  const [inputCity, setInputCity] = useState<string>(""); // Local state for input field value

  // Toggle dark mode function
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev); // Switch between dark and light modes
  }, []);

  // Function to fetch weather data for a selected city
  const fetchWeatherData = async (city: string, unit: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_SECRET; // Retrieve API key from environment variables
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url); // Make API request to fetch weather data
      setForecastData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching forecast data:", error); // Log any errors
    }
  };

  // Function to fetch city suggestions based on user input
  const fetchCitySuggestions = async (inputValue: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_SECRET; // Retrieve API key from environment variables
      const response = await axios.get<CitySuggestion[]>( // Fetch city suggestions
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`
      );
      const newSuggestions = response.data.map(
        (item) => `${item.name}, ${item.state}, ${item.country}` // Format suggestions
      );
      setCitySuggestions(newSuggestions); // Update suggestions state
    } catch (error) {
      console.error("Error fetching city suggestions:", error); // Log any errors
      setCitySuggestions([]); // Clear suggestions if an error occurs
    }
  };

  // Function to handle search submission
  const handleSearch = useCallback(
    (city: string) => {
      setSelectedCity(city); // Update the selected city state
      fetchWeatherData(city, unit); // Fetch weather data for the selected city
      setCitySuggestions([]); // Clear suggestions after search
      setInputCity(""); // Clear input field after search
    },
    [unit] // Dependency on unit to re-fetch data if unit changes
  );

  // Function to handle unit change (metric/imperial)
  const handleUnitChange = useCallback(
    (newUnit: string) => {
      setUnit(newUnit); // Update unit state
      fetchWeatherData(selectedCity, newUnit); // Fetch weather data with new unit
    },
    [selectedCity] // Dependency on selected city
  );

  // Fetch weather data when selected city or unit changes
  useEffect(() => {
    fetchWeatherData(selectedCity, unit);
  }, [selectedCity, unit]);

  // Handle input change for city suggestions
  const handleInputChange = (inputValue: string) => {
    setInputCity(inputValue); // Update local input state

    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear previous debounce timeout
    }

    if (inputValue.length > 0) {
      // Set a new debounce timeout for city suggestions
      setDebounceTimeout(
        setTimeout(() => fetchCitySuggestions(inputValue), 300) // 300 ms debounce
      );
    } else {
      setCitySuggestions([]); // Clear suggestions if input is empty
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-black bg-gray-100">
        <Navbar
          darkMode={darkMode} // Pass dark mode status to Navbar
          toggleDarkMode={toggleDarkMode} // Pass function to toggle dark mode
          onUnitChange={handleUnitChange} // Pass function to handle unit change
        />
        <div className="container mx-auto mt-4 p-4">
          <CityInputForm
            darkMode={darkMode} // Pass dark mode status to CityInputForm
            city={inputCity} // Use local input state for input value
            suggestions={citySuggestions} // Pass city suggestions to CityInputForm
            onSearch={handleSearch} // Call weather API on search
            onInputChange={handleInputChange} // Handle input change for suggestions
          />
          {forecastData && (
            <WeatherForecast forecastData={forecastData} unit={unit} /> // Render WeatherForecast if data is available
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

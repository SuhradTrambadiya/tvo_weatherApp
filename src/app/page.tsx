"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import WeatherForecast from "@/components/WeatherForecast";
import CityInputForm from "@/components/CityInputForm";
import { WeatherResponse, CitySuggestion } from "@/Interface/Weather.Interface";
import axios from "axios";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [unit, setUnit] = useState<string>("metric");
  const [forecastData, setForecastData] = useState<WeatherResponse | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("Toronto");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [inputCity, setInputCity] = useState<string>(""); // Local state for input

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const fetchWeatherData = async (city: string, unit: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_SECRET;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url);
      setForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const fetchCitySuggestions = async (inputValue: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_SECRET;
      const response = await axios.get<CitySuggestion[]>(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`);
      const newSuggestions = response.data.map(item => `${item.name}, ${item.state}, ${item.country}`);
      setCitySuggestions(newSuggestions);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setCitySuggestions([]); // Clear suggestions if an error occurs
    }
  };

  const handleSearch = useCallback((city: string) => {
    setSelectedCity(city);
    fetchWeatherData(city, unit); // Fetch weather data only on submission
    setCitySuggestions([]); // Clear suggestions after search
    setInputCity(""); // Clear input field after search
  }, [unit]);

  const handleUnitChange = useCallback((newUnit: string) => {
    setUnit(newUnit);
    fetchWeatherData(selectedCity, newUnit);
  }, [selectedCity]);

  useEffect(() => {
    fetchWeatherData(selectedCity, unit);
  }, [selectedCity, unit]);

  const handleInputChange = (inputValue: string) => {
    setInputCity(inputValue); // Update the local input state

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (inputValue.length > 0) {
      setDebounceTimeout(
        setTimeout(() => fetchCitySuggestions(inputValue), 300) // 300 ms debounce
      );
    } else {
      setCitySuggestions([]);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-black bg-gray-100">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onUnitChange={handleUnitChange}
        />
        <div className="container mx-auto mt-4 p-4">
          <CityInputForm
            darkMode={darkMode}
            city={inputCity} // Use local input state for input value
            suggestions={citySuggestions}
            onSearch={handleSearch} // Call weather API on search
            onInputChange={handleInputChange} // Handle input change for suggestions
          />
          {forecastData && (
            <WeatherForecast forecastData={forecastData} unit={unit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

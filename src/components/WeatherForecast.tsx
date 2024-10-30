import React from "react";
import { WeatherResponse } from "@/Interface/Weather.Interface";
import Image from "next/image";
import { FaSun, FaMoon, FaEye } from "react-icons/fa";

// Define the props expected by the WeatherForecast component.
interface WeatherForecastProps {
  forecastData: WeatherResponse; // The weather data fetched from the API.
  unit: string; // The unit of measurement for temperature (metric or imperial).
}

// WeatherForecast component responsible for displaying weather information and forecasts.
const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecastData,
  unit,
}) => {
  // Extract current weather data from the forecast data.
  const currentWeather = forecastData.list[0];
  
  // Slice the forecast data to get the next 5 forecast items.
  const forecastItems = forecastData.list.slice(1, 6);

  // Function to determine card styles based on weather conditions.
  const getCardStyles = (condition: string) => ({
    Clear: "bg-blue-400 dark:bg-blue-800", // Clear weather style.
    Rain: "bg-indigo-400 dark:bg-indigo-800", // Rain weather style.
    Clouds: "bg-gray-300 dark:bg-gray-600", // Cloudy weather style.
    Snow: "bg-cyan-400 dark:bg-cyan-800", // Snowy weather style.
  }[condition] || "bg-gray-300 dark:bg-gray-700"); // Default style for unspecified conditions.

  return (
    <div className="container mx-auto p-6">
      {/* Display the city name and country as the header */}
      <h2 className="text-5xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        {forecastData.city.name}, {forecastData.city.country}
      </h2>

      {/* Current Weather and Additional Info Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 justify-center">
        {/* Current Weather Card */}
        <div className="flex-1 p-6 rounded-xl shadow-lg bg-blue-500 dark:bg-green-900 transition-all">
          <h3 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Current Weather
          </h3>
          <div className="flex items-center justify-center mb-4">
            <Image
              // Display the current weather icon
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              width={100}
              height={100}
              className="transition-transform transform hover:scale-110"
            />
            <div className="ml-4 text-center">
              {/* Current temperature display */}
              <p className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
                {currentWeather.main.temp}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className="text-lg capitalize text-gray-800 dark:text-cyan-300 mt-2">
                {currentWeather.weather[0].description}
              </p>
            </div>
          </div>
          <div className="flex justify-around text-lg text-gray-800 dark:text-cyan-300 mt-6">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 dark:text-cyan-300">
                Humidity
              </span>
              <span className="text-xl text-gray-800 dark:text-gray-200">
                {currentWeather.main.humidity}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 dark:text-cyan-300">
                Wind
              </span>
              <span className="text-xl text-gray-800 dark:text-gray-200">
                {currentWeather.wind.speed} {unit === "metric" ? "m/s" : "mph"}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="flex-1 p-6 rounded-xl shadow-lg bg-green-500 dark:bg-green-900 transition-all">
          <h3 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
            Additional Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Visibility Info */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaEye className="text-green-600 dark:text-green-300" />
                <h4 className="text-lg font-bold dark:text-cyan-300">
                  Visibility
                </h4>
              </div>
              <p className="text-xl text-center text-gray-800 dark:text-gray-200">
                {(currentWeather.visibility / 1000).toFixed(1)} km
              </p>
            </div>

            {/* Sunrise Info */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaSun className="text-yellow-600 dark:text-yellow-300" />
                <h4 className="text-lg font-bold dark:text-cyan-300">
                  Sunrise
                </h4>
              </div>
              <p className="text-xl text-center text-gray-800 dark:text-gray-200">
                {new Date(forecastData.city.sunrise * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>

            {/* Sunset Info */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaMoon className="text-blue-600 dark:text-blue-300" />
                <h4 className="text-lg font-bold dark:text-cyan-300">Sunset</h4>
              </div>
              <p className="text-xl text-center text-gray-800 dark:text-gray-200">
                {new Date(forecastData.city.sunset * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <h3 className="text-4xl font-semibold text-center mb-6 dark:text-gray-100">
        3 - Hour Forecast
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {forecastItems.map((item) => (
          <div
            key={item.dt}
            className={`${getCardStyles(
              item.weather[0].main
            )} flex flex-col items-center p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105`}
          >
            {/* Forecast date */}
            <p className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-200">
              {item.dt_txt}
              
            </p>
            <Image
              // Display the weather icon for the forecast
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="Weather Icon"
              width={60}
              height={60}
            />
            <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
              {item.main.temp}°{unit === "metric" ? "C" : "F"}
            </p>
            <p className="capitalize text-gray-700 dark:text-gray-300">
              {item.weather[0].description}
            </p>
            <div className="flex justify-between w-full mt-3 text-sm text-gray-700 dark:text-gray-300">
              <span>Humidity: {item.main.humidity}%</span>
              <span>
                Wind: {item.wind.speed} {unit === "metric" ? "m/s" : "mph"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
  
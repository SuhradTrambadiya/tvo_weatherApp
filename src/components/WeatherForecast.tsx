import React from "react";
import { WeatherResponse } from "@/Interface/Weather.Interface";
import Image from "next/image";
import { FaSun, FaMoon, FaEye } from "react-icons/fa";

interface WeatherForecastProps {
  forecastData: WeatherResponse;
  unit: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecastData,
  unit,
}) => {
  const currentWeather = forecastData.list[0];
  const forecastItems = forecastData.list.slice(1, 6);

  const getCardStyles = (condition: string) => ({
    Clear: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white", // Sunny day
    Rain: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white",   // Rainy weather
    Clouds: "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-800", // Overcast clouds
    Snow: "bg-gradient-to-r from-white to-blue-300 text-gray-800",      // Snowy weather
    Thunderstorm: "bg-gradient-to-r from-gray-800 to-purple-600 text-white", // Thunderstorms
    Drizzle: "bg-gradient-to-r from-teal-400 to-green-500 text-white", // Drizzle
    Mist: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800",   // Misty weather
  }[condition] || "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"); // Default styles
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-5xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        {forecastData.city.name}, {forecastData.city.country}
      </h2>

      {/* Current Weather and Additional Info Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 justify-center">
        {/* Current Weather Card */}
        <div className="flex-1 p-6 rounded-xl shadow-lg bg-blue-700 text-white transition-all hover:shadow-xl">
          <h3 className="text-3xl font-semibold text-center mb-4">Current Weather</h3>
          <div className="flex items-center justify-center mb-4">
            <Image
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              width={100}
              height={100}
              className="transition-transform transform hover:scale-110"
            />
            <div className="ml-4 text-center">
              <p className="text-5xl font-bold">
                {currentWeather.main.temp}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className="text-lg mt-2 capitalize">{currentWeather.weather[0].description}</p>
            </div>
          </div>
          <div className="flex justify-around text-lg mt-4">
            <div className="flex flex-col items-center">
              <span className="font-semibold">Humidity</span>
              <span>{currentWeather.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Wind</span>
              <span>{currentWeather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</span>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="flex-1 p-6 rounded-xl shadow-lg bg-green-600 text-white transition-all hover:shadow-xl">
          <h3 className="text-3xl font-semibold text-center mb-4">Additional Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaEye className="text-green-600 dark:text-green-300" />
                <h4 className="text-lg font-bold text-gray-800 dark:text-cyan-300">Visibility</h4>
              </div>
              <p className="text-xl text-center text-gray-800 dark:text-gray-200">
                {(currentWeather.visibility / 1000).toFixed(1)} km
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaSun className="text-yellow-600 dark:text-yellow-300" />
                <h4 className="text-lg font-bold text-gray-800 dark:text-cyan-300">Sunrise</h4>
              </div>
              <p className="text-xl text-center text-gray-800 dark:text-gray-200">
                {new Date(forecastData.city.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaMoon className="text-blue-600 dark:text-blue-300" />
                <h4 className="text-lg font-bold text-gray-800 dark:text-cyan-300">Sunset</h4>
              </div>
              <p className="text-xl text-center text-gray-800 dark:text-gray-200">
                {new Date(forecastData.city.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <h3 className="text-4xl font-semibold text-center mb-6 dark:text-white">3-Hour Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {forecastItems.map((item) => (
          <div
            key={item.dt}
            className={`${getCardStyles(item.weather[0].main)} flex flex-col items-center p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105`}
          >
            <p className="text-xl font-semibold mb-1 text-gray-800">{/* Increased contrast */ }
              {new Date(item.dt_txt).toLocaleString([], {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <Image
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="Weather Icon"
              width={60}
              height={60}
            />
            <p className="text-lg font-bold text-black">
              {item.main.temp}°{unit === "metric" ? "C" : "F"}
            </p>
            <p className="capitalize text-gray-800 font-semibold">{item.weather[0].description}</p>
            <div className="flex justify-between w-full mt-3 text-sm text-black font-semibold ">
              <span>Humidity: {item.main.humidity}%</span>
              <span>Wind: {item.wind.speed} {unit === "metric" ? "m/s" : "mph"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;

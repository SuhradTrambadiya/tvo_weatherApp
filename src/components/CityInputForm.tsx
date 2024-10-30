"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Axios for API requests
import { CitySuggestion } from "@/Interface/Weather.Interface"; // Import the new interface

interface CityInputFormProps {
  darkMode: boolean; // Dark mode state to style the component based on theme
  onSearch: (city: string) => void; // Callback function triggered on search submission
}

const CityInputForm = ({ darkMode, onSearch }: CityInputFormProps) => {
  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const suggestionRef = useRef<HTMLUListElement>(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    if (inputValue.length > 0) {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_SECRET;

        const response = await axios.get<CitySuggestion[]>( // Specify the response type
          `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`
        );

        // Create a Set to store unique suggestions with city and country
        const uniqueSuggestions = new Set<string>();
        response.data.forEach(item => {
          const fullName = `${item.name}`; // Combine city name and country
          uniqueSuggestions.add(fullName); // Add to Set for uniqueness
        });

        setSuggestions(Array.from(uniqueSuggestions)); // Convert Set back to Array
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setSuggestions([]); // Clear suggestions if error occurs
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setSuggestions([]);
      setCity("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center p-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
      <h2 className="text-4xl font-bold mb-6 text-center">Weather Forecast</h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl"
      >
        <div className="flex flex-col w-full lg:w-2/3">
          <div className="flex mb-4">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter city name..."
              className={`flex-1 p-4 rounded-l-lg border-4 border-indigo-600 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="City name input"
            />
            <button
              type="submit"
              className={`ml-2 px-6 py-2 rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label="Search button"
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="relative">
              <ul
                ref={suggestionRef}
                className={`absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
                role="listbox"
                aria-label="City suggestions"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-500 ${
                      darkMode ? "hover:bg-blue-600" : "hover:bg-blue-100"
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    role="option"
                    aria-label={`Select ${suggestion}`}
                    aria-selected={city === suggestion}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CityInputForm;

"use client";
import React, { useRef, useState } from "react";

// Define the props for the CityInputForm component
interface CityInputFormProps {
  darkMode: boolean; // Boolean to determine if dark mode is enabled
  city: string; // The current city input value
  suggestions: string[]; // Array of city suggestions
  onSearch: (city: string) => void; // Callback function triggered on search submission
  onInputChange: (inputValue: string) => void; // Callback to handle input change
}

// CityInputForm component
const CityInputForm = ({
  darkMode,
  city,
  suggestions,
  onSearch,
  onInputChange,
}: CityInputFormProps) => {
  const suggestionRef = useRef<HTMLUListElement>(null); // Ref to manage suggestion list
  const [selectedIndex, setSelectedIndex] = useState(-1); // State to track selected suggestion index

  // Function to handle the search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (city) {
      onSearch(city); // Trigger the search with the current city input
    }
  };

  // Function to handle keyboard navigation through suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      onSearch(suggestions[selectedIndex]);
    }
  };

  // Update the selected index to -1 if the input changes
  const handleInputChange = (value: string) => {
    onInputChange(value);
    setSelectedIndex(-1); // Reset selected index when input changes
  };

  return (
    <div
      className={`flex flex-col items-center p-8 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
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
              onChange={(e) => handleInputChange(e.target.value)} // Update input change handling
              onKeyDown={handleKeyDown} // Attach keydown handler for keyboard navigation
              placeholder="Enter city name..."
              className={`flex-1 p-4 rounded-l-lg border-4 border-indigo-600 ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="City name input"
            />
            <button
              type="submit"
              className={`ml-2 px-6 py-2 rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-700 text-white hover:bg-blue-800"
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
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
                role="listbox"
                aria-label="City suggestions"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-md cursor-pointer transition-colors duration-300 ${
                      index === selectedIndex
                        ? `bg-blue-500 ${darkMode ? "hover:bg-blue-700" : "hover:bg-blue-300"}`
                        : darkMode
                        ? "hover:bg-blue-700"
                        : "hover:bg-blue-100"
                    }`}
                    onClick={() => onSearch(suggestion)}
                    role="option"
                    aria-pressed={selectedIndex === index} // Use aria-pressed instead of aria-selected
                    onMouseEnter={() => setSelectedIndex(index)} // Update selected index on mouse enter
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

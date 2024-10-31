"use client";
import React, { useRef } from "react";

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

  // Function to handle the search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (city) {
      onSearch(city); // Trigger the search with the current city input
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-8 ${
        darkMode ? "text-white" : "text-gray-900" // Conditional styling based on dark mode
      }`}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Weather Forecast</h2> {/* Title of the form */}

      <form
        onSubmit={handleSearch} // Attach the handleSearch function to the form submission
        className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl"
      >
        <div className="flex flex-col w-full lg:w-2/3">
          <div className="flex mb-4">
            <input
              type="text"
              value={city} // Use the input city state
              onChange={(e) => onInputChange(e.target.value)} // Handle input change and update local state
              placeholder="Enter city name..."
              className={`flex-1 p-4 rounded-l-lg border-4 border-indigo-600 ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`} // Styling for the input
              aria-label="City name input" // Accessibility label for the input
            />
            <button
              type="submit"
              className={`ml-2 px-6 py-2 rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`} // Styling for the search button
              aria-label="Search button" // Accessibility label for the button
            >
              Search
            </button>
          </div>

          {/* Render suggestions if available */}
          {suggestions.length > 0 && (
            <div className="relative">
              <ul
                ref={suggestionRef} // Attach ref to the suggestion list
                className={`absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`} // Styling for the suggestion list
                role="listbox" // Accessibility role
                aria-label="City suggestions" // Accessibility label for the suggestion list
              >
                {/* Map through suggestions and create a list item for each */}
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-500 ${
                      darkMode ? "hover:bg-blue-700" : "hover:bg-blue-100"
                    }`} // Styling for each suggestion
                    onClick={() => onSearch(suggestion)} // Call onSearch with the selected suggestion
                    role="option" // Accessibility role for list items
                    aria-label={`Select ${suggestion}`} // Accessibility label for each suggestion
                  >
                    {suggestion} {/* Display the suggestion text */}
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

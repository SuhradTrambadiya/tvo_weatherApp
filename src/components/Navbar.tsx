"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaMoon, FaSun, FaCog } from "react-icons/fa";

// Define the props for the Navbar component
interface NavbarProps {
  darkMode: boolean; // Boolean indicating whether dark mode is enabled
  toggleDarkMode: () => void; // Callback to toggle dark mode
  onUnitChange: (unit: string) => void; // Callback to handle unit changes (metric/imperial)
}

// Navbar component
const Navbar = ({ darkMode, toggleDarkMode, onUnitChange }: NavbarProps) => {
  let selectedUnit = "metric"; // Default selected unit
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State to manage dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to manage dropdown element

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the clicked target is outside the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    // Attach event listener to handle clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`flex items-center justify-between p-4 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-blue-500 text-white"
      }`} // Apply dark/light mode styling
      aria-label="Main Navigation" // Accessibility label for the navigation
    >
      <div className="text-2xl font-bold underline underline-offset-8">
        Suhrad - WeatherApi {/* Navbar title */}
      </div>

      <div className="flex items-center space-x-4 relative">
        {" "}
        {/* Flex container for buttons */}
        {/* Button to toggle dark mode */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-md focus:outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            darkMode
              ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
              : "bg-gray-300 text-gray-900 hover:bg-blue-400"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} // Accessibility label for the button
        >
          {darkMode ? (
            <FaSun size={20} aria-hidden="true" /> // Sun icon for light mode
          ) : (
            <FaMoon size={20} aria-hidden="true" /> // Moon icon for dark mode
          )}
        </button>
        <div className="relative" ref={dropdownRef}>
          {" "}
          {/* Dropdown container */}
          {/* Button to toggle the settings dropdown */}
          <button
            onClick={toggleDropdown}
            className={`p-2 rounded-md focus:outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              darkMode
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-blue-300 text-gray-900 hover:bg-blue-400"
            }`}
            aria-label="Settings" // Accessibility label for the settings button
          >
            <FaCog size={20} aria-hidden="true" /> {/* Cog icon for settings */}
          </button>
          {/* Render dropdown if it is open */}
          {isDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg p-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
              role="menu" // Accessibility role for the dropdown menu
            >
              <p className="px-4 py-2 text-sm font-bold underline underline-offset-4">
                Select Unit {/* Dropdown title */}
              </p>

              {/* Button to select Celsius */}
              <button
                onClick={() => onUnitChange("metric")} // Call onUnitChange with "metric"
                className="block w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
                role="menuitem" // Accessibility role for menu item
                aria-selected={selectedUnit === "metric"} // Set aria-selected based on the current selection
              >
                Celsius
              </button>

              {/* Button to select Fahrenheit */}
              <button
                onClick={() => onUnitChange("imperial")} // Call onUnitChange with "imperial"
                className="block w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
                role="menuitem" // Accessibility role for menu item
                aria-selected={selectedUnit === "imperial"} // Set aria-selected based on the current selection
              >
                Fahrenheit
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

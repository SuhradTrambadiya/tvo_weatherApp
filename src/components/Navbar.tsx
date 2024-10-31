"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaMoon, FaSun, FaCog } from "react-icons/fa";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onUnitChange: (unit: string) => void;
}

const Navbar = ({ darkMode, toggleDarkMode, onUnitChange }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("metric"); // Default unit
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
    onUnitChange(unit);
  };

  return (
    <nav
      className={`flex items-center justify-between p-4 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-blue-500 text-white"
      }`}
      aria-label="Main Navigation"
    >
      <div className="text-2xl font-bold underline underline-offset-8">
        Suhrad - WeatherApi
      </div>

      <div className="flex items-center space-x-4 relative">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-md focus:outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            darkMode
              ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
              : "bg-gray-300 text-gray-900 hover:bg-blue-400"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <FaSun size={20} aria-hidden="true" />
          ) : (
            <FaMoon size={20} aria-hidden="true" />
          )}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`p-2 rounded-md focus:outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              darkMode
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-blue-300 text-gray-900 hover:bg-blue-400"
            }`}
            aria-label="Settings"
          >
            <FaCog size={20} aria-hidden="true" />
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg p-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
              role="menu"
            >
              <p className="px-4 py-2 text-sm font-bold underline underline-offset-4">
                Select Unit
              </p>

              <button
                onClick={() => handleUnitChange("metric")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
                role="menuitem"
                aria-selected={selectedUnit === "metric"} // Set aria-selected
              >
                Celsius
              </button>

              <button
                onClick={() => handleUnitChange("imperial")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
                role="menuitem"
                aria-selected={selectedUnit === "imperial"} // Set aria-selected
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

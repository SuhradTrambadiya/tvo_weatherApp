import React from 'react'

const loding = () => {
  return (
    <div><div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-4">Weather Forecast</h1>
    <div className="flex justify-center mb-4">
        <input type="text" placeholder="Enter city name..." className="p-2 border border-gray-300 rounded-l-md" />
        <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">Search</button>
    </div>

    <h2 className="text-2xl text-center mb-4">Sample City, SC</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Current Weather</h3>
            <p className="text-2xl">Temp: 18°C</p>
            <p className="text-gray-600">Humidity: 65%</p>
            <p className="text-gray-600">Wind: 3 m/s</p>
            <p className="text-gray-600">Condition: clear sky</p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Additional Info</h3>
            <p className="text-gray-600">Visibility: 10 km</p>
            <p className="text-gray-600">Sunrise: 04:20 PM</p>
            <p className="text-gray-600">Sunset: 04:20 AM</p>
        </div>
    </div>

    <h3 className="text-xl font-semibold text-center mb-2">5-Day Forecast</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
            <p>Temperature: 16°C</p>
            <p>Weather: scattered clouds</p>
            <p>Humidity: 70%</p>
            <p>Wind Speed: 2 m/s</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
            <p>Temperature: 15°C</p>
            <p>Weather: light rain</p>
            <p>Humidity: 75%</p>
            <p>Wind Speed: 4 m/s</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
            <p>Temperature: 14°C</p>
            <p>Weather: light snow</p>
            <p>Humidity: 80%</p>
            <p>Wind Speed: 3 m/s</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg">
            <p>Temperature: 13°C</p>
            <p>Weather: clear sky</p>
            <p>Humidity: 85%</p>
            <p>Wind Speed: 2 m/s</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg">
            <p>Temperature: 13°C</p>
            <p>Weather: clear sky</p>
            <p>Humidity: 85%</p>
            <p>Wind Speed: 2 m/s</p>
        </div>
    </div>
</div>
</div>
  )
}

export default loding
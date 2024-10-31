// WeatherData.ts
interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  country: string;
  sunrise?: number;
  sunset?: number;
}

interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  sys: Sys;
  dt_txt: string;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}


export interface CitySuggestion {
  name: string; 
}

export interface CitySuggestion {
  name: string;   // City name
  country: string; // Country name
  state?: string;  // Optional province or state name
  lat: number;     // Latitude
  lon: number;     // Longitude
}


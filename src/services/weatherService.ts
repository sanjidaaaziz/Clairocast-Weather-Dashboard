import axios from "axios";
import { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 7,
        aqi: "yes",
        alerts: "yes",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 7,
        aqi: "yes",
        alerts: "yes",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export const searchLocations = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching locations:", error);
    throw new Error("Failed to search locations");
  }
};

// For demo/development - returns mock data when API key is not set
export const getMockWeatherData = (): WeatherData => {
  return {
    location: {
      name: "San Francisco",
      country: "United States",
      lat: 37.77,
      lon: -122.42,
      timezone: "America/Los_Angeles",
      localtime: "2023-10-20 09:30",
    },
    current: {
      temp_c: 15.6,
      temp_f: 60.1,
      is_day: 1,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003,
      },
      wind_mph: 8.1,
      wind_kph: 13.0,
      wind_dir: "W",
      pressure_mb: 1015.0,
      pressure_in: 29.97,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 76,
      cloud: 25,
      feelslike_c: 15.6,
      feelslike_f: 60.1,
      vis_km: 16.0,
      vis_miles: 9.9,
      uv: 4.0,
      gust_mph: 12.3,
      gust_kph: 19.8,
    },
    forecast: {
      forecastday: [
        {
          date: "2023-10-20",
          date_epoch: 1697760000,
          day: {
            maxtemp_c: 18.9,
            maxtemp_f: 66.0,
            mintemp_c: 14.2,
            mintemp_f: 57.6,
            avgtemp_c: 16.2,
            avgtemp_f: 61.2,
            maxwind_mph: 11.0,
            maxwind_kph: 17.6,
            totalprecip_mm: 0.0,
            totalprecip_in: 0.0,
            totalsnow_cm: 0.0,
            avgvis_km: 10.0,
            avgvis_miles: 6.2,
            avghumidity: 80.0,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: "Partly cloudy",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1003,
            },
            uv: 4.0,
          },
          astro: {
            sunrise: "07:23 AM",
            sunset: "06:28 PM",
            moonrise: "02:34 PM",
            moonset: "11:45 PM",
            moon_phase: "First Quarter",
            moon_illumination: "50",
            is_moon_up: 1,
            is_sun_up: 0,
          },
          hour: Array(24)
            .fill(null)
            .map((_, i) => ({
              time_epoch: 1697760000 + i * 3600,
              time: `2023-10-20 ${String(i).padStart(2, "0")}:00`,
              temp_c: 14.2 + (i > 6 && i < 18 ? i % 8 : 0),
              temp_f: 57.6 + (i > 6 && i < 18 ? (i % 8) * 1.8 : 0),
              is_day: i >= 7 && i <= 18 ? 1 : 0,
              condition: {
                text: i >= 7 && i <= 18 ? "Partly cloudy" : "Clear",
                icon:
                  i >= 7 && i <= 18
                    ? "//cdn.weatherapi.com/weather/64x64/day/116.png"
                    : "//cdn.weatherapi.com/weather/64x64/night/113.png",
                code: i >= 7 && i <= 18 ? 1003 : 1000,
              },
              wind_mph: 5 + (i % 5),
              wind_kph: 8 + (i % 8),
              wind_degree: 270,
              wind_dir: "W",
              pressure_mb: 1015.0,
              pressure_in: 29.97,
              precip_mm: 0.0,
              precip_in: 0.0,
              humidity: 75 + (i % 10),
              cloud: 25,
              feelslike_c: 14.2 + (i > 6 && i < 18 ? i % 8 : 0),
              feelslike_f: 57.6 + (i > 6 && i < 18 ? (i % 8) * 1.8 : 0),
              windchill_c: 14.2 + (i > 6 && i < 18 ? i % 8 : 0),
              windchill_f: 57.6 + (i > 6 && i < 18 ? (i % 8) * 1.8 : 0),
              heatindex_c: 14.2 + (i > 6 && i < 18 ? i % 8 : 0),
              heatindex_f: 57.6 + (i > 6 && i < 18 ? (i % 8) * 1.8 : 0),
              dewpoint_c: 11.0,
              dewpoint_f: 51.8,
              will_it_rain: 0,
              chance_of_rain: 0,
              will_it_snow: 0,
              chance_of_snow: 0,
              vis_km: 10.0,
              vis_miles: 6.2,
              gust_mph: 11.0,
              gust_kph: 17.7,
              uv: i >= 7 && i <= 18 ? 4.0 : 1.0,
            })),
        },
        // Generate the next 6 days with slight variations
        ...Array(6)
          .fill(null)
          .map((_, dayIndex) => ({
            date: `2023-10-${21 + dayIndex}`,
            date_epoch: 1697760000 + (dayIndex + 1) * 86400,
            day: {
              maxtemp_c: 18.9 + (dayIndex % 4),
              maxtemp_f: 66.0 + (dayIndex % 4) * 1.8,
              mintemp_c: 14.2 - (dayIndex % 3),
              mintemp_f: 57.6 - (dayIndex % 3) * 1.8,
              avgtemp_c: 16.2,
              avgtemp_f: 61.2,
              maxwind_mph: 11.0,
              maxwind_kph: 17.6,
              totalprecip_mm: dayIndex % 3 === 0 ? 2.5 : 0.0,
              totalprecip_in: dayIndex % 3 === 0 ? 0.1 : 0.0,
              totalsnow_cm: 0.0,
              avgvis_km: 10.0,
              avgvis_miles: 6.2,
              avghumidity: 80.0,
              daily_will_it_rain: dayIndex % 3 === 0 ? 1 : 0,
              daily_chance_of_rain: dayIndex % 3 === 0 ? 70 : 0,
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: {
                text: dayIndex % 3 === 0 ? "Light rain" : "Partly cloudy",
                icon:
                  dayIndex % 3 === 0
                    ? "//cdn.weatherapi.com/weather/64x64/day/296.png"
                    : "//cdn.weatherapi.com/weather/64x64/day/116.png",
                code: dayIndex % 3 === 0 ? 1183 : 1003,
              },
              uv: 4.0,
            },
            astro: {
              sunrise: "07:23 AM",
              sunset: "06:28 PM",
              moonrise: "02:34 PM",
              moonset: "11:45 PM",
              moon_phase: "First Quarter",
              moon_illumination: String(50 + dayIndex),
              is_moon_up: 1,
              is_sun_up: 0,
            },
            hour: Array(24)
              .fill(null)
              .map((_, i) => ({
                time_epoch: 1697760000 + (dayIndex + 1) * 86400 + i * 3600,
                time: `2023-10-${21 + dayIndex} ${String(i).padStart(
                  2,
                  "0"
                )}:00`,
                temp_c: 14.2 + (i > 6 && i < 18 ? i % 8 : 0) + (dayIndex % 4),
                temp_f:
                  57.6 +
                  (i > 6 && i < 18 ? (i % 8) * 1.8 : 0) +
                  (dayIndex % 4) * 1.8,
                is_day: i >= 7 && i <= 18 ? 1 : 0,
                condition: {
                  text:
                    dayIndex % 3 === 0 && i >= 10 && i <= 15
                      ? "Light rain"
                      : i >= 7 && i <= 18
                      ? "Partly cloudy"
                      : "Clear",
                  icon:
                    dayIndex % 3 === 0 && i >= 10 && i <= 15
                      ? "//cdn.weatherapi.com/weather/64x64/day/296.png"
                      : i >= 7 && i <= 18
                      ? "//cdn.weatherapi.com/weather/64x64/day/116.png"
                      : "//cdn.weatherapi.com/weather/64x64/night/113.png",
                  code:
                    dayIndex % 3 === 0 && i >= 10 && i <= 15
                      ? 1183
                      : i >= 7 && i <= 18
                      ? 1003
                      : 1000,
                },
                wind_mph: 5 + (i % 5),
                wind_kph: 8 + (i % 8),
                wind_degree: 270,
                wind_dir: "W",
                pressure_mb: 1015.0,
                pressure_in: 29.97,
                precip_mm: dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 0.5 : 0.0,
                precip_in:
                  dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 0.02 : 0.0,
                humidity: 75 + (i % 10),
                cloud: dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 70 : 25,
                feelslike_c:
                  14.2 + (i > 6 && i < 18 ? i % 8 : 0) + (dayIndex % 4),
                feelslike_f:
                  57.6 +
                  (i > 6 && i < 18 ? (i % 8) * 1.8 : 0) +
                  (dayIndex % 4) * 1.8,
                windchill_c:
                  14.2 + (i > 6 && i < 18 ? i % 8 : 0) + (dayIndex % 4),
                windchill_f:
                  57.6 +
                  (i > 6 && i < 18 ? (i % 8) * 1.8 : 0) +
                  (dayIndex % 4) * 1.8,
                heatindex_c:
                  14.2 + (i > 6 && i < 18 ? i % 8 : 0) + (dayIndex % 4),
                heatindex_f:
                  57.6 +
                  (i > 6 && i < 18 ? (i % 8) * 1.8 : 0) +
                  (dayIndex % 4) * 1.8,
                dewpoint_c: 11.0,
                dewpoint_f: 51.8,
                will_it_rain: dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 1 : 0,
                chance_of_rain:
                  dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 70 : 0,
                will_it_snow: 0,
                chance_of_snow: 0,
                vis_km: dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 7.0 : 10.0,
                vis_miles: dayIndex % 3 === 0 && i >= 10 && i <= 15 ? 4.3 : 6.2,
                gust_mph: 11.0,
                gust_kph: 17.7,
                uv: i >= 7 && i <= 18 ? 4.0 : 1.0,
              })),
          })),
      ],
    },
    alerts: {
      alert: [],
    },
  };
};

export default {
  fetchWeatherByCoords,
  fetchWeatherByCity,
  searchLocations,
  getMockWeatherData,
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  WeatherData,
  SavedLocation,
  UserPreferences,
  TemperatureUnit,
  TimeFormat,
} from "../types/weather";
import {
  fetchWeatherByCoords,
  fetchWeatherByCity,
  getMockWeatherData,
} from "../services/weatherService";
import toast from "react-hot-toast";

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  currentLocation: SavedLocation | null;
  savedLocations: SavedLocation[];
  preferences: UserPreferences;
  fetchWeatherForLocation: (location: SavedLocation) => Promise<void>;
  fetchWeatherForCity: (city: string) => Promise<void>;
  fetchWeatherForCurrentLocation: () => Promise<void>;
  addSavedLocation: (location: SavedLocation) => void;
  removeSavedLocation: (locationName: string) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setTimeFormat: (format: TimeFormat) => void;
}

const defaultPreferences: UserPreferences = {
  temperatureUnit: "celsius",
  timeFormat: "24h",
  savedLocations: [],
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<SavedLocation | null>(
    null
  );
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Load preferences from localStorage if available
    const savedPreferences = localStorage.getItem("weatherPreferences");
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weatherPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const fetchWeatherForLocation = async (location: SavedLocation) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherByCoords(location.lat, location.lon);
      setWeatherData(data);
      setCurrentLocation(location);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      toast.error("Failed to fetch weather data");
      console.error(err);
      // Use mock data for development/demo
      if (process.env.NODE_ENV === "development") {
        const mockData = getMockWeatherData();
        setWeatherData(mockData);
        setCurrentLocation({
          name: mockData.location.name,
          country: mockData.location.country,
          lat: mockData.location.lat,
          lon: mockData.location.lon,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
      setCurrentLocation({
        name: data.location.name,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
      });
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      //toast.error("Failed to fetch weather data");
      console.error(err);
      // Use mock data for development/demo
      if (process.env.NODE_ENV === "development") {
        const mockData = getMockWeatherData();
        setWeatherData(mockData);
        setCurrentLocation({
          name: mockData.location.name,
          country: mockData.location.country,
          lat: mockData.location.lat,
          lon: mockData.location.lon,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherByCoords(latitude, longitude);

      setWeatherData(data);
      setCurrentLocation({
        name: data.location.name,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
      });

      //toast.success(`Weather loaded for ${data.location.name}`);
    } catch (err) {
      setError(
        "Failed to get your location. Please try again or search for a city."
      );
      toast.error("Failed to get your location");
      console.error(err);

      // Use mock data for development/demo
      if (process.env.NODE_ENV === "development") {
        const mockData = getMockWeatherData();
        setWeatherData(mockData);
        setCurrentLocation({
          name: mockData.location.name,
          country: mockData.location.country,
          lat: mockData.location.lat,
          lon: mockData.location.lon,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const addSavedLocation = (location: SavedLocation) => {
    setPreferences((prev) => {
      // Check if location already exists
      const exists = prev.savedLocations.some(
        (loc) => loc.name === location.name && loc.country === location.country
      );

      if (exists) {
        toast.error(`${location.name} is already in your saved locations`);
        return prev;
      }

      toast.success(`${location.name} added to saved locations`);
      return {
        ...prev,
        savedLocations: [...prev.savedLocations, location],
      };
    });
  };

  const removeSavedLocation = (locationName: string) => {
    setPreferences((prev) => {
      const newLocations = prev.savedLocations.filter(
        (loc) => loc.name !== locationName
      );
      toast.success(`${locationName} removed from saved locations`);
      return {
        ...prev,
        savedLocations: newLocations,
      };
    });
  };

  const setTemperatureUnit = (unit: TemperatureUnit) => {
    setPreferences((prev) => ({
      ...prev,
      temperatureUnit: unit,
    }));
  };

  const setTimeFormat = (format: TimeFormat) => {
    setPreferences((prev) => ({
      ...prev,
      timeFormat: format,
    }));
  };

  // On initial load, try to get the user's current location
  useEffect(() => {
    // For demo/development, use mock data if no API key
    // if (process.env.NODE_ENV === "development") {
    //   const mockData = getMockWeatherData();
    //   setWeatherData(mockData);
    //   setCurrentLocation({
    //     name: mockData.location.name,
    //     country: mockData.location.country,
    //     lat: mockData.location.lat,
    //     lon: mockData.location.lon,
    //   });
    //   setLoading(false);
    //   return;
    // }

    fetchWeatherForCurrentLocation();
  }, []);

  const contextValue: WeatherContextType = {
    weatherData,
    loading,
    error,
    currentLocation,
    savedLocations: preferences.savedLocations,
    preferences,
    fetchWeatherForLocation,
    fetchWeatherForCity,
    fetchWeatherForCurrentLocation,
    addSavedLocation,
    removeSavedLocation,
    setTemperatureUnit,
    setTimeFormat,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

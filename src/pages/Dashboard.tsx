import React, { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import DailyForecast from "../components/weather/DailyForecast";
import HourlyForecast from "../components/weather/HourlyForecast";
import WeatherChart from "../components/weather/WeatherChart";
import WeatherAlerts from "../components/weather/WeatherAlerts";
import { getWeatherBackground } from "../utils/weatherBackgrounds";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard: React.FC = () => {
  const { weatherData, loading, error } = useWeather();

  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat", // prevent tiling
  });

  const [gradientColor, setGradientColor] = useState(
    "from-blue-500/80 to-blue-900/50"
  );
  const currentYear = new Date().getFullYear();
  // Update background based on weather
  useEffect(() => {
    if (weatherData) {
      const { condition } = weatherData.current;
      const isDay = weatherData.current.is_day === 1;
      const background = getWeatherBackground(condition.code, isDay);

      setBackgroundStyle({
        backgroundImage: `url("${background.url}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      });

      setGradientColor(background.color);
    }
  }, [weatherData]);

  // Show error if any
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700">
        <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
        <p className="text-white text-xl">Loading weather data...</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 p-4 text-center">
        <h2 className="text-2xl text-white mb-4">
          Unable to load weather data
        </h2>
        <p className="text-white/80 mb-6">
          There was a problem retrieving the weather information. Please check
          your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    // Make this div relative so the absolute gradient overlay is positioned inside here
    <div
      className="relative min-h-screen flex flex-col bg-gradient-to-br"
      style={backgroundStyle}
    >
      {/* Gradient overlay with transparent gradient colors */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} z-0`}
        style={{ pointerEvents: "none" }} // prevent overlay blocking clicks
      ></div>

      {/* Content should be above gradient overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow container mx-auto px-4 pb-8 pt-20">
          <div className="grid grid-cols-1 gap-6 mt-4">
            <CurrentWeather />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyForecast />
              <HourlyForecast />
            </div>

            <WeatherChart />

            <WeatherAlerts />
          </div>
        </main>

        <footer className="relative z-10 container mx-auto px-4 py-4">
          <p className="text-white/60 text-center text-sm">
            Clairocast • Data sourced from WeatherAPI.com <br />©{" "}
            {currentYear} Sanjida Binta Aziz. All rights reserved.
          </p>
        </footer>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "backdrop-blur-md bg-white/20 text-white border border-white/20",
          style: {
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
        }}
      />
    </div>
  );
};

export default Dashboard;

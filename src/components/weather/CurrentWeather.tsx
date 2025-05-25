import React from "react";
import { useWeather } from "../../context/WeatherContext";
import GlassContainer from "../ui/GlassContainer";
import { Wind, Droplets, Eye, Sun, Umbrella, CloudCog } from "lucide-react";
import { motion } from "framer-motion";

const CurrentWeather: React.FC = () => {
  const { weatherData, preferences } = useWeather();

  if (!weatherData) return null;

  const { current, location } = weatherData;
  const isMetric = preferences.temperatureUnit === "celsius";

  // Format date and time
  const datetime = new Date(location.localtime);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: preferences.timeFormat === "12h",
  };
  const formattedDateTime = datetime.toLocaleString(undefined, options);

  // Weather details to display in the smaller glass containers
  const weatherDetails = [
    {
      icon: (
        <Wind className="w-5 h-5 text-blue-300 drop-shadow-[0_0_5px_rgba(147,197,253,0.7)] brightness-150" />
      ),
      label: "Wind",
      value: isMetric ? `${current.wind_kph} km/h` : `${current.wind_mph} mph`,
    },
    {
      icon: (
        <Droplets className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_5px_rgba(147,197,253,0.7)] brightness-150" />
      ),
      label: "Humidity",
      value: `${current.humidity}%`,
    },
    {
      icon: (
        <Eye className="w-5 h-5 text-blue-300 drop-shadow-[0_0_5px_rgba(147,197,253,0.7)] brightness-150" />
      ),
      label: "Visibility",
      value: isMetric ? `${current.vis_km} km` : `${current.vis_miles} mi`,
    },
    {
      icon: (
        <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_5px_rgba(253,224,71,0.8)] brightness-150" />
      ),
      label: "UV Index",
      value: current.uv.toString(),
      additional:
        current.uv < 3
          ? "Low"
          : current.uv < 6
          ? "Moderate"
          : current.uv < 8
          ? "High"
          : "Very High",
    },
    {
      icon: (
        <Umbrella className="w-5 h-5 text-blue-400 drop-shadow-[0_0_5px_rgba(147,197,253,0.7)] brightness-150" />
      ),
      label: "Precipitation",
      value: isMetric ? `${current.precip_mm} mm` : `${current.precip_in} in`,
    },
    {
      icon: (
        <CloudCog className="w-5 h-5 text-purple-400 drop-shadow-[0_0_5px_rgba(147,197,253,0.7)] brightness-150" />
      ),
      label: "Air Quality",
      value: `${current.air_quality.pm2_5.toFixed(1)}`,
      additional:
        current.air_quality.pm2_5 < 12
          ? "Good"
          : current.air_quality.pm2_5 < 35.4
          ? "Moderate"
          : current.air_quality.pm2_5 < 150.4
          ? "Unhealthy"
          : current.air_quality.pm2_5 < 250.4
          ? "Very Unhealthy"
          : "Hazardous",
    },
  ];

  return (
    <GlassContainer className="p-6">
      <div className="text-white">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold mb-2">{location.name}</h2>
          <p className="text-white/70">{formattedDateTime}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center my-6">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={current.condition.icon.replace("//", "https://")}
              alt={current.condition.text}
              className="w-24 h-24 mr-4"
            />
            <div>
              <p className="text-5xl font-semibold">
                {isMetric
                  ? `${Math.round(current.temp_c)}°C`
                  : `${Math.round(current.temp_f)}°F`}
              </p>
              <p className="text-xl text-white/80">{current.condition.text}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg">
              Feels like:{" "}
              {isMetric
                ? `${Math.round(current.feelslike_c)}°C`
                : `${Math.round(current.feelslike_f)}°F`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
          {weatherDetails.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-3 flex flex-col items-center text-center"
            >
              <div className="mb-2">{detail.icon}</div>
              <p className="text-sm text-white/70">{detail.label}</p>
              <p className="text-lg font-medium">{detail.value}</p>
              {detail.direction && (
                <p className="text-xs text-white/70">{detail.direction}</p>
              )}
              {detail.additional && (
                <p className="text-xs text-white/70">{detail.additional}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </GlassContainer>
  );
};

export default CurrentWeather;

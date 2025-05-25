import React, { useRef } from "react";
import { useWeather } from "../../context/WeatherContext";
import GlassContainer from "../ui/GlassContainer";
import { format } from "date-fns";
import { motion } from "framer-motion";

const DailyForecast: React.FC = () => {
  const { weatherData, preferences } = useWeather();
  const scrollRef = useRef<HTMLDivElement>(null);
  if (!weatherData) return null;

  const { forecast } = weatherData;
  const isMetric = preferences.temperatureUnit === "celsius";

  const scrollAmount = 300;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <GlassContainer className="p-4">
      <h3 className="text-xl font-medium text-white mb-4">7-Day Forecast</h3>

      {/* Wrapper relative to hold buttons inside */}
      <div className="relative">
        {/* Scroll left button inside the box */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/40"
          aria-label="Scroll left"
        >
          &#8249;
        </button>

        {/* Scroll container with padding so buttons don't overlap content */}
        <div
          className="overflow-x-auto pb-2 scrollbar-hide pl-12 pr-12"
          ref={scrollRef}
        >
          <div className="flex space-x-3 min-w-max">
            {forecast.forecastday.map((day, index) => {
              const date = new Date(day.date);
              const isToday = index === 0;
              const formattedDate = format(date, "EEE, MMM d");

              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex-shrink-0 w-[140px] rounded-3xl ${
                    isToday ? "bg-blue-600/40" : "bg-white/10"
                  } backdrop-blur-sm p-3 text-white text-center`}
                >
                  <p className="font-medium mb-1">
                    {isToday ? "Today" : formattedDate}
                  </p>

                  <div className="my-2 flex justify-center">
                    <img
                      src={day.day.condition.icon.replace("//", "https://")}
                      alt={day.day.condition.text}
                      className="w-12 h-12"
                    />
                  </div>

                  <p className="text-sm mb-2">{day.day.condition.text}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {isMetric
                        ? `${Math.round(day.day.mintemp_c)}°`
                        : `${Math.round(day.day.mintemp_f)}°`}
                    </span>
                    <div className="w-full mx-2 h-1 bg-white/30 rounded">
                      <div
                        className="h-1 bg-white rounded"
                        style={{
                          width: `${Math.round(
                            ((day.day.maxtemp_c - day.day.mintemp_c) / 40) * 100
                          )}%`,
                          marginLeft: `${Math.round(
                            (day.day.mintemp_c / 40) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-medium">
                      {isMetric
                        ? `${Math.round(day.day.maxtemp_c)}°`
                        : `${Math.round(day.day.maxtemp_f)}°`}
                    </span>
                  </div>

                  <div className="mt-3 text-xs">
                    <div className="flex justify-between">
                      <span>Precip:</span>
                      <span>{day.day.daily_chance_of_rain}%</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Humidity:</span>
                      <span>{day.day.avghumidity}%</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>UV Index:</span>
                      <span>{day.day.uv}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll right button inside the box */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/40"
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </GlassContainer>
  );
};

export default DailyForecast;

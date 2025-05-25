import React, { useState, useRef, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";
import GlassContainer from "../ui/GlassContainer";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

const HourlyForecast: React.FC = () => {
  const { weatherData, preferences } = useWeather();
  const [selectedDay, setSelectedDay] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!weatherData) return null;

  const { forecast } = weatherData;
  const isMetric = preferences.temperatureUnit === "celsius";
  const is12Hour = preferences.timeFormat === "12h";
  const hours = forecast.forecastday[selectedDay].hour;
  const currentHour = new Date().getHours();
  const isToday = selectedDay === 0;

  const scrollAmount = 300;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // ✅ Auto scroll to current hour on mount
  useEffect(() => {
    if (!scrollRef.current || !isToday) return;

    const hourIndex = hours.findIndex((hour) => {
      const hourTime = parseISO(hour.time).getHours();
      return hourTime === currentHour;
    });

    if (hourIndex !== -1) {
      const cardWidth = 92; // 80px card + 12px gap
      const containerPadding = 24; // px-6 on the scroll container
      const scrollOffset = 0; // second card position

      const scrollTarget =
        Math.max(0, (hourIndex - scrollOffset) * cardWidth) + containerPadding;

      scrollRef.current.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    }
  }, [selectedDay, hours, currentHour, isToday]);

  return (
    <GlassContainer className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-white">Hourly Forecast</h3>
        <div className="flex space-x-2">
          {forecast.forecastday.slice(0, 3).map((day, index) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(index)}
              className={`px-3 py-1 rounded-full text-xs ${
                selectedDay === index
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {index === 0 ? "Today" : format(parseISO(day.date), "EEE")}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/40"
        >
          &#8249;
        </button>

        {/* Scroll container with hidden scrollbar */}
        <div
          className="overflow-x-auto pb-2 px-6 scrollbar-hide"
          ref={scrollRef}
        >
          <div className="flex space-x-3 min-w-max">
            {hours.map((hour, index) => {
              const hourTime = parseISO(hour.time);
              const hourNum = hourTime.getHours();
              const isCurrentHour = isToday && hourNum === currentHour;
              const isPastHour = isToday && hourNum < currentHour;
              const opacity = isPastHour ? "opacity-50" : "opacity-100";

              return (
                <motion.div
                  key={hour.time}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isPastHour ? 0.5 : 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex-shrink-0 w-[90px] rounded-3xl ${
                    isCurrentHour ? "bg-blue-600/40" : "bg-white/10"
                  } backdrop-blur-sm p-5 text-white text-center ${opacity}`}
                >
                  <p className="text-sm font-medium">
                    {is12Hour
                      ? format(hourTime, "h a")
                      : format(hourTime, "HH:00")}
                  </p>

                  <div className="my-12 flex justify-center">
                    <img
                      src={hour.condition.icon.replace("//", "https://")}
                      alt={hour.condition.text}
                      className="w-10 h-10"
                    />
                  </div>

                  <p className="text-lg font-medium">
                    {isMetric
                      ? `${Math.round(hour.temp_c)}°`
                      : `${Math.round(hour.temp_f)}°`}
                  </p>

                  <p className="mt-1 text-xs text-white/70">
                    {hour.chance_of_rain > 0 ? `${hour.chance_of_rain}%` : ""}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/40"
        >
          &#8250;
        </button>
      </div>
    </GlassContainer>
  );
};

export default HourlyForecast;

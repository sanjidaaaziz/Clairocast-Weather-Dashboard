import React, { useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";
import { useWeather } from "../../context/WeatherContext";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchWeatherForCity, fetchWeatherForCurrentLocation } = useWeather();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherForCity(query.trim());
      setQuery("");
      setIsExpanded(false);
    }
  };

  const handleUseLocation = () => {
    fetchWeatherForCurrentLocation();
    setIsExpanded(false);
  };

  return (
    <div className="relative z-10">
      {isExpanded ? (
        <motion.form
          initial={{ width: "40px", opacity: 0.9 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
          onSubmit={handleSearch}
        >
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or location..."
              className="w-full pl-10 pr-10 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              autoFocus
            />
            <Search className="absolute left-3 h-5 w-5 text-white" />
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="absolute right-3 p-1 rounded-full hover:bg-white/20"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
          {/* <button
            type="button"
            onClick={handleUseLocation}
            className="ml-2 p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-colors"
            title="Use my location"
          >
            <MapPin className="h-5 w-5 text-white" />
          </button> */}
        </motion.form>
      ) : (
        <motion.button
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsExpanded(true)}
          className="p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-colors"
        >
          <Search className="h-5 w-5 text-white" />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;

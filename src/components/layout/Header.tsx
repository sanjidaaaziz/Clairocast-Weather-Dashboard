import React, { useState } from "react";
import { Menu, X, Settings, MapPin, Heart, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "../../context/WeatherContext";
import SearchBar from "../ui/SearchBar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const {
    currentLocation,
    savedLocations,
    fetchWeatherForLocation,
    removeSavedLocation,
    preferences,
    setTemperatureUnit,
    setTimeFormat,
    fetchWeatherForCurrentLocation, // assumed you have this
  } = useWeather();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setShowSettings(false);
      setShowLocations(false);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowLocations(false);
  };

  const toggleLocations = () => {
    setShowLocations(!showLocations);
    setShowSettings(false);
  };

  const handleLocationSelect = (location: (typeof savedLocations)[0]) => {
    fetchWeatherForLocation(location);
    setIsMenuOpen(false);
    setShowLocations(false);
  };

  const handleUseMyLocation = () => {
    fetchWeatherForCurrentLocation();
    setIsMenuOpen(false);
  };

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  };

  const subMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold mr-2">Clairocast</h1>
        {currentLocation && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-white/80" />
            <span className="text-white/80 text-sm ml-1">
              {currentLocation.name}, {currentLocation.country}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {!isMenuOpen && (
          <>
            <SearchBar />

            <button
              onClick={handleUseMyLocation}
              className="p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-colors text-white"
              title="Use My Location"
            >
              <MapPin className="h-5 w-5" />
            </button>
          </>
        )}

        <button
          onClick={toggleMenu}
          className="p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-white-900/90 backdrop-blur-lg p-5 shadow-xl"
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <nav className="space-y-4">
              <button
                onClick={toggleSettings}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 text-white"
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Settings</span>
                </div>
                <span
                  className={`transition-transform ${
                    showSettings ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={subMenuVariants}
                    transition={{ duration: 0.2 }}
                    className="ml-4 pl-4 border-l border-white/20 space-y-3 overflow-hidden"
                  >
                    <div className="space-y-2">
                      <p className="text-white/70 text-sm">Temperature Unit</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setTemperatureUnit("celsius")}
                          className={`px-3 py-1 rounded-full text-sm ${
                            preferences.temperatureUnit === "celsius"
                              ? "bg-blue-500 text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          °C
                        </button>
                        <button
                          onClick={() => setTemperatureUnit("fahrenheit")}
                          className={`px-3 py-1 rounded-full text-sm ${
                            preferences.temperatureUnit === "fahrenheit"
                              ? "bg-blue-500 text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          °F
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-white/70 text-sm">Time Format</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setTimeFormat("12h")}
                          className={`px-3 py-1 rounded-full text-sm ${
                            preferences.timeFormat === "12h"
                              ? "bg-blue-500 text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          12h
                        </button>
                        <button
                          onClick={() => setTimeFormat("24h")}
                          className={`px-3 py-1 rounded-full text-sm ${
                            preferences.timeFormat === "24h"
                              ? "bg-blue-500 text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          24h
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={toggleLocations}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 text-white"
              >
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-3" />
                  <span>Saved Locations</span>
                </div>
                <span
                  className={`transition-transform ${
                    showLocations ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              <AnimatePresence>
                {showLocations && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={subMenuVariants}
                    transition={{ duration: 0.2 }}
                    className="ml-4 pl-4 border-l border-white/20 space-y-3 overflow-hidden"
                  >
                    {savedLocations.length === 0 ? (
                      <p className="text-white/50 text-sm">
                        No saved locations yet.
                      </p>
                    ) : (
                      savedLocations.map((location) => (
                        <div
                          key={`${location.name}-${location.lat}-${location.lon}`}
                          className="flex items-center justify-between group"
                        >
                          <button
                            onClick={() => handleLocationSelect(location)}
                            className="text-white hover:text-blue-300 flex items-center"
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{location.name}</span>
                          </button>
                          <button
                            onClick={() => removeSavedLocation(location.name)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    )}

                    {currentLocation && (
                      <button
                        onClick={() => handleLocationSelect(currentLocation)}
                        className="flex items-center text-white/70 hover:text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Save current location</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

export interface WeatherBackground {
  url: string;
  color: string;
}

// Weather background images and gradient colors based on weather condition
export const getWeatherBackground = (
  conditionCode: number,
  isDay: boolean
): WeatherBackground => {
  // Clear
  if ([1000].includes(conditionCode)) {
    return isDay
      ? {
          url: "https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg",
          color: "from-blue-500/80 to-blue-900/50",
        }
      : {
          url: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg",
          color: "from-indigo-900/80 to-purple-900/50",
        };
  }

  // Partly cloudy
  else if ([1003].includes(conditionCode)) {
    return isDay
      ? {
          url: "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg",
          color: "from-blue-400/70 to-blue-700/50",
        }
      : {
          url: "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg",
          color: "from-indigo-800/80 to-purple-900/50",
        };
  }

  // Cloudy
  else if ([1006, 1009].includes(conditionCode)) {
    return isDay
      ? {
          url: "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg",
          color: "from-gray-400/70 to-gray-700/50",
        }
      : {
          url: "https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg",
          color: "from-gray-800/80 to-gray-900/50",
        };
  }

  // Mist, fog
  else if ([1030, 1135, 1147].includes(conditionCode)) {
    return {
      url: "https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg",
      color: "from-gray-300/70 to-gray-600/50",
    };
  }

  // Rain, drizzle
  else if (
    [
      1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246,
    ].includes(conditionCode)
  ) {
    return {
      url: "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg",
      color: "from-blue-700/70 to-blue-900/50",
    };
  }

  // Thunderstorm
  else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
    return {
      url: "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg",
      color: "from-gray-800/80 to-gray-900/50",
    };
  }

  // Snow
  else if (
    [
      1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279,
      1282,
    ].includes(conditionCode)
  ) {
    return {
      url: "https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg",
      color: "from-blue-200/70 to-blue-400/50",
    };
  }

  // Default/fallback
  return isDay
    ? {
        url: "https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg",
        color: "from-blue-500/80 to-blue-900/50",
      }
    : {
        url: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg",
        color: "from-indigo-900/80 to-purple-900/50",
      };
};

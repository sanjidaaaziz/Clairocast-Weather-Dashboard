import React, { useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import GlassContainer from "../ui/GlassContainer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format, parseISO } from "date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type ChartType = "temperature" | "precipitation" | "humidity" | "wind";

const WeatherChart: React.FC = () => {
  const { weatherData, preferences } = useWeather();
  const [chartType, setChartType] = useState<ChartType>("temperature");
  const [selectedDay, setSelectedDay] = useState(0);

  if (!weatherData) return null;

  const { forecast } = weatherData;
  const isMetric = preferences.temperatureUnit === "celsius";
  const hours = forecast.forecastday[selectedDay].hour;

  // Prepare data based on selected chart type
  const getChartData = () => {
    // Format hours for x-axis
    const labels = hours.map((hour) =>
      format(
        parseISO(hour.time),
        preferences.timeFormat === "12h" ? "h a" : "HH:00"
      )
    );

    // Set data and styling based on chart type
    let data, backgroundColor, borderColor, label, yAxisLabel;

    switch (chartType) {
      case "temperature":
        data = hours.map((hour) => (isMetric ? hour.temp_c : hour.temp_f));
        backgroundColor = "rgba(255, 99, 132, 0.2)";
        borderColor = "rgba(255, 99, 132, 1)";
        label = isMetric ? "Temperature (°C)" : "Temperature (°F)";
        yAxisLabel = isMetric ? "°C" : "°F";
        break;
      case "precipitation":
        data = hours.map((hour) => hour.chance_of_rain);
        backgroundColor = "rgba(54, 162, 235, 0.2)";
        borderColor = "rgba(54, 162, 235, 1)";
        label = "Chance of Rain (%)";
        yAxisLabel = "%";
        break;
      case "humidity":
        data = hours.map((hour) => hour.humidity);
        backgroundColor = "rgba(75, 192, 192, 0.2)";
        borderColor = "rgba(75, 192, 192, 1)";
        label = "Humidity (%)";
        yAxisLabel = "%";
        break;
      case "wind":
        data = hours.map((hour) => (isMetric ? hour.wind_kph : hour.wind_mph));
        backgroundColor = "rgba(153, 102, 255, 0.2)";
        borderColor = "rgba(153, 102, 255, 1)";
        label = isMetric ? "Wind Speed (km/h)" : "Wind Speed (mph)";
        yAxisLabel = isMetric ? "km/h" : "mph";
        break;
    }

    return {
      labels,
      datasets: [
        {
          label,
          data,
          fill: true,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          pointBackgroundColor: borderColor,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: borderColor,
          tension: 0.4,
        },
      ],
      yAxisLabel,
    };
  };

  const chartData = getChartData();

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 10,
          },
          maxRotation: 0,
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: function (value: number) {
            return value + (chartData.yAxisLabel || "");
          },
        },
      },
    },
  };

  const chartTypes: { id: ChartType; label: string }[] = [
    { id: "temperature", label: "Temperature" },
    { id: "precipitation", label: "Precipitation" },
    { id: "humidity", label: "Humidity" },
    { id: "wind", label: "Wind" },
  ];

  return (
    <GlassContainer className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h3 className="text-xl font-semibold text-white">Weather Trends</h3>

        <div className="flex flex-wrap gap-2">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setChartType(type.id)}
              className={`px-3 py-1 rounded-full text-xs ${
                chartType === type.id
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 mb-2">
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

      <div className="h-[200px] sm:h-[250px]">
        <Line data={chartData} options={options} />
      </div>
    </GlassContainer>
  );
};

export default WeatherChart;

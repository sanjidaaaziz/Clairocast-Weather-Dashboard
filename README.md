# 🌤️ Clairocast — A Modern Weather Dashboard

A modern, responsive weather dashboard built with React and TypeScript, featuring a beautiful glassmorphism design that adapts to current weather conditions.

![cover](https://github.com/user-attachments/assets/9ce9a6fe-1596-47d1-ad31-d859fc962400)
![cover2](https://github.com/user-attachments/assets/b8b45b30-19bf-4dae-a138-1672c0a14ae9)

## Live Link
🔗 https://clairocast-weather-dashboard.vercel.app/

## Features

- 🌡️ Real-time weather data with dynamic updates
- 📱 Fully responsive design for all devices
- 🎨 Dynamic backgrounds based on weather conditions
- 📍 Geolocation support for instant local weather
- 💾 Save and manage multiple locations
- 📊 Interactive weather charts and visualizations
- ⚡ Real-time weather alerts
- 🌍 7-day forecast with detailed information
- ⏰ Hourly weather updates
- 🎯 Precise location search
- 🌓 Day/night mode adaptation
- 🔄 Temperature unit conversion (°C/°F)
- 🕒 Time format selection (12h/24h)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Chart.js & React-Chartjs-2
- Framer Motion
- Axios
- Date-fns
- Lucide React Icons

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sanjidaaaziz/Clairocast-Weather-Dashboard.git
   cd Clairocast-Weather-Dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your WeatherAPI.com API key:

   - Sign up at [WeatherAPI.com](https://www.weatherapi.com)
   - Get your API key from the dashboard
   - Create your .env file and paste your API keys:
     ```typescript
     VITE_WEATHER_API_KEY = "your_actual_api_key_here";
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit
   ```bash
   `http://localhost:5173`
   ````

### Development Mode

When running in development mode without an API key, the application will use mock data to demonstrate functionality. This allows for development and testing without requiring immediate API setup.

## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout components
│   ├── ui/           # Reusable UI components
│   └── weather/      # Weather-specific components
├── context/          # React context for state management
├── services/         # API and data services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Features in Detail

### Weather Data

#### Current conditions

  ![current](https://github.com/user-attachments/assets/55411ae4-f066-4733-832b-a5e067389f77)

#### 7-day forecast

  ![7days](https://github.com/user-attachments/assets/869307f5-948e-4458-ac47-6c29cc5dd16b)

#### Hourly updates

  ![hour](https://github.com/user-attachments/assets/53377cc3-13e2-46e6-8ffa-b0e309fda3f8)

#### Weather alerts
#### Historical trends

  ![weather_trends](https://github.com/user-attachments/assets/26577624-33ef-4ebc-939d-6188e0f60c67)


### User Interface

- Glassmorphism design
- Dynamic weather backgrounds
- Responsive layouts
- Smooth animations
- Interactive charts

### User Preferences

- Temperature unit selection (°C/°F)
- Time format selection (12h/24h)
- Location management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com)
- Background images from [Pexels](https://www.pexels.com)
- Icons from [Lucide](https://lucide.dev)

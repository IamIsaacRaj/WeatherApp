import axios from "axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (error) {
      setError("City Not Found! Try Again.");
      setWeather(null);
      console.log("Error fetching weather:", error);
    }
  };

  const getWindDescription = (speed) => {
    if (speed < 1) return "Calm 🌿";
    if (speed < 5) return "Light Breeze 🍃";
    if (speed < 10) return "Moderate Wind 🌬️";
    return "Strong Wind 💨";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        {/* Heading at the top */}
        <header className="text-center py-6">
          <h1 className="text-3xl font-bold">Weather App</h1>
        </header>
        {/* Input and Button */}
        <div className="flex flex-col items-center mt-6">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter city"
              className="p-2 rounded-md text-black w-96 "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button
              className="px-4 py-4 bg-blue-500 rounded-md font-semibold"
              onClick={fetchWeather}
            >
              Get Weather
            </button>
          </div>
        </div>
        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {/* Weather Info Section */}
        {weather && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-start">
            {/* City and Country */}
            <div className="flex items-center mb-2">
              <h2 className="text-2xl font-bold mr-2">
                {weather.name}, {weather.sys.country}
              </h2>
              {/* Weather Icon */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className="w-12 h-12"
              />
            </div>
            {/* Weather Details */}
            <p className="text-lg">🌡Temperature: {weather.main.temp}°C</p>
            <p className="text-lg">
              🌡Temp feels like: {weather.main.feels_like}°C
            </p>
            <p className="text-lg">
              ⛅ Condition:{weather.weather[0].main},
              {weather.weather[0].description}
            </p>
            <p className="text-lg">
              💨 Wind: {weather.wind.speed} m/s (
              {(weather.wind.speed * 3.6).toFixed(1)} km/h) -{" "}
              {getWindDescription(weather.wind.speed)}
            </p>
            <p className="text-lg">🥵 Humidity: {weather.main.humidity}%</p>
            <p className="text-lg">
              🌫️ Air Pressure: {weather.main.pressure} hPa
            </p>
            <p className="text-lg">⛅ Cloudiness: {weather.clouds.all}%</p>
            <p className="text-lg">
              🌧 Rain:{" "}
              {weather.rain?.["1h"] ? `${weather.rain["1h"]} mm` : "No rain"}{" "}
            </p>
            <p className="text-lg">
              ❄ Snow:{" "}
              {weather.snow?.["1h"] ? `${weather.snow["1h"]} mm` : "No snow"}{" "}
            </p>
            <p className="text-lg">
              🌄 Sunrise: {formatTime(weather.sys.sunrise)}
            </p>
            <p className="text-lg">
              🌆 Sunset: {formatTime(weather.sys.sunset)}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

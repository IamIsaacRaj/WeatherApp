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
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
            {/* City and Country */}
            <div className="flex flex-row items-center mb-2">
              <div className="mb-2 ">
                <p className="text-md text-gray-400">
                  {new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>{" "}
                {/* Example Output: "Mar 20, 01:03 PM" */}
                <h2 className="text-2xl font-bold">
                  {weather.name}, {weather.sys.country}
                </h2>
              </div>
              {/* Weather Icon */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className="w-12 h-12"
              />
            </div>
            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 text-lg">
              <p>
                🌡 <strong>Temp:</strong> {weather.main.temp}°C
              </p>
              <p>
                🥵 <strong>Feels Like:</strong> {weather.main.feels_like}°C
              </p>
              <p>
                ⛅ <strong>Condition:</strong> {weather.weather[0].main}
              </p>
              <p>
                💨 <strong>Wind:</strong> {weather.wind.speed} m/s (
                {(weather.wind.speed * 3.6).toFixed(1)} km/h) -{" "}
                {getWindDescription(weather.wind.speed)}
              </p>
              <p>
                🌫 <strong>Cloudiness:</strong> {weather.clouds.all}%
              </p>
              <p>
                🥵 <strong>Humidity:</strong> {weather.main.humidity}%
              </p>
              <p>
                🌡 <strong>Pressure:</strong> {weather.main.pressure} hPa
              </p>
              <p>
                🚗 <strong>Visibility:</strong>{" "}
                {(weather.visibility / 1000).toFixed(1)} km
              </p>
              <p>
                🌧 <strong>Rain:</strong>{" "}
                {weather.rain?.["1h"] ? `${weather.rain["1h"]} mm` : "No rain"}
              </p>
              <p>
                ❄ <strong>Snow:</strong>{" "}
                {weather.snow?.["1h"] ? `${weather.snow["1h"]} mm` : "No snow"}
              </p>
              <p>
                🌄 <strong>Sunrise:</strong> {formatTime(weather.sys.sunrise)}
              </p>
              <p>
                🌆 <strong>Sunset:</strong> {formatTime(weather.sys.sunset)}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

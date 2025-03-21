# Weather App 🌦️

A simple and responsive weather application built using React.js and OpenWeatherMap API. It allows users to fetch real-time weather details for any city.

## Features
- Fetches real-time weather data
- Displays temperature, condition, humidity, wind speed, cloudiness, and more
- Responsive UI using Tailwind CSS
- Error handling for invalid city names
- Uses .env to store API keys securely

## Tech Stack
- React.js (Vite)
- TailwindCSS
- OpenWeatherMap API

## Installation
1️⃣ Clone the Repository
```bash
git clone YOUR_GITHUB_REPO_URL
cd weather-app
npm install
npm run dev
```

2️⃣ Install Dependencies

```bash
npm install
```
3️⃣ Set Up API Key
- Create a .env file in the project root
- Add the OpenWeatherMap API key inside .env:
```text
VITE_WEATHER_API_KEY = your_api_key_here
```
4️⃣ Start the Application
```bash
npm run dev
```
Open http://localhost:5173 in your browser

## 🔑 API Used
OpenWeatherMap API for real-time weather data
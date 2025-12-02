const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDiv = document.getElementById("weatherInfo");

  if (city === "") {
    weatherDiv.innerHTML = `<p>Please enter a city name 🌍</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${icon}" alt="Weather icon" />
      <p><b>${data.weather[0].main}</b> - ${data.weather[0].description}</p>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}
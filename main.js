form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = input.value.trim();

  if (!city) return;

  statusEl.textContent = "Loading...";
  weatherEl.innerHTML = "";

  try {
    const data = await getWeather(city);

    statusEl.textContent = "";
    renderWeather(data);
  } catch (error) {
    statusEl.textContent = error.message;
    weatherEl.innerHTML = "";
  }
});function renderWeather(data) {
  weatherEl.innerHTML = `
    <div class="card">
      <h2>${data.name}</h2>
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    </div>
  `;
}async function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("City not found");
  }

  return await response.json();
}
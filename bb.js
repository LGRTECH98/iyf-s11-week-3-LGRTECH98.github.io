<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Weather Dashboard</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial, Helvetica, sans-serif;
    background:linear-gradient(135deg,#4facfe,#00f2fe);
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}

.container{
    width:400px;
    background:#fff;
    padding:25px;
    border-radius:15px;
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
}

h1{
    text-align:center;
    margin-bottom:20px;
    color:#333;
}

form{
    display:flex;
    gap:10px;
}

input{
    flex:1;
    padding:10px;
    font-size:16px;
    border:1px solid #ccc;
    border-radius:5px;
}

button{
    padding:10px 15px;
    background:#007BFF;
    color:#fff;
    border:none;
    border-radius:5px;
    cursor:pointer;
}

button:hover{
    background:#0056b3;
}

#status{
    text-align:center;
    margin-top:15px;
    color:red;
}

.card{
    margin-top:20px;
    text-align:center;
}

.card h2{
    margin-bottom:10px;
}

.card img{
    width:100px;
}

.temp{
    font-size:40px;
    font-weight:bold;
    color:#007BFF;
}

.info{
    margin-top:10px;
    font-size:18px;
}
</style>

</head>
<body>

<div class="container">
    <h1>🌤 Weather Dashboard</h1>

    <form id="search-form">
        <input
            id="city-input"
            type="text"
            placeholder="Enter city name"
            required
        >
        <button type="submit">Search</button>
    </form>

    <div id="status"></div>
    <div id="weather"></div>
</div>

<script>

const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const weatherEl = document.getElementById("weather");

async function getWeather(city){

    const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("City not found");
    }

    return await response.json();
}

function renderWeather(data){

    weatherEl.innerHTML = `
        <div class="card">
            <h2>${data.name}, ${data.sys.country}</h2>

            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

            <div class="temp">${Math.round(data.main.temp)}°C</div>

            <div class="info">
                <p><strong>${data.weather[0].description}</strong></p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        </div>
    `;
}

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const city = input.value.trim();

    if(city === "") return;

    statusEl.textContent = "Loading...";
    weatherEl.innerHTML = "";

    try{

        const data = await getWeather(city);

        statusEl.textContent = "";

        renderWeather(data);

    }catch(error){

        statusEl.textContent = error.message;

    }

});

</script>

</body>
</html>
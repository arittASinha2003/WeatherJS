function setBackground() {
    var hour = new Date().getHours();
    var body = document.getElementById('body');
    
    if (hour >= 6 && hour < 18) {
        body.classList.add('daytime');
        body.classList.remove('nighttime');
    } else {
        body.classList.add('nighttime');
        body.classList.remove('daytime');
    }
}

function getWeather() {
    // var apiKey = "e366d83a2d8dda99ab0b179b3b61db99";
    var city = document.getElementById('city-input').value.trim();
    
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    var url = `/weather?city=${city}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("City not found");
        }
        return response.json();
    })
    .then(data => {
        // Convert temperature to Celsius
        var tempCelsius = Math.round(data.main.temp - 273.15);
        
        // Convert visibility to kilometers
        var visibilityKm = (data.visibility / 1000).toFixed(2);
        
        // Convert wind speed to kilometers per hour
        var windSpeedKmph = (data.wind.speed * 3.6).toFixed(2);
        
        // Convert Unix timestamp to Indian Standard Time
        var sunriseIST = new Date(data.sys.sunrise * 1000).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});
        var sunsetIST = new Date(data.sys.sunset * 1000).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});
        
        // Update the webpage with the converted data
        document.getElementById('city').textContent = data.name;
        document.getElementById('temperature').textContent = tempCelsius + '°C';
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity + '%';
        document.getElementById('cloud').textContent = data.clouds.all + '%';
        document.getElementById('visibility').textContent = visibilityKm + ' km';
        document.getElementById('wind-speed').textContent = windSpeedKmph + ' km/h';
        document.getElementById('wind-direction').textContent = data.wind.deg + '°';
        document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
        document.getElementById('sunrise').textContent = sunriseIST;
        document.getElementById('sunset').textContent = sunsetIST;
        
        // Show the weather details
        var weatherDetails = document.getElementById('weather-details');
        weatherDetails.style.display = 'flex';
        weatherDetails.style.opacity = '1';

        // Animate cards
        var cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100); // Stagger the animation
        });
    })
    .catch(err => {
        console.error(err);
        alert("Failed to fetch weather data: " + err.message);
    });
}

// Hide the weather details initially
document.getElementById('weather-details').style.display = 'none';

// Set background image based on time
setBackground();

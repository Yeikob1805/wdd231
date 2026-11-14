
const eventsContainer = document.querySelector("#events-container");

const events = [
    {
        title: "Lima Business Networking",
        date: "November 20, 2026",
        time: "6:00 PM",
        location: "San Isidro, Lima",
        description: "Connect with local entrepreneurs and business professionals."
    },
    {
        title: "Digital Innovation Workshop",
        date: "November 25, 2026",
        time: "10:00 AM",
        location: "Miraflores, Lima",
        description: "Explore digital tools and strategies to grow your business."
    },
    {
        title: "Entrepreneurship Conference",
        date: "December 4, 2026",
        time: "9:00 AM",
        location: "San Borja, Lima",
        description: "Learn from business leaders and discover new opportunities."
    }
];

function displayEvents() {
    eventsContainer.innerHTML = "";

    events.forEach(event => {
        const card = document.createElement("article");
        card.classList.add("event-card");

        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
        `;

        eventsContainer.appendChild(card);
    });
}

displayEvents();


const API_KEY = "8e942148607b4ef9a885bb3205e46cfe";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5";

async function getWeather() {
    const currentWeather = document.querySelector("#current-weather");
    const forecastContainer = document.querySelector("#weather-forecast");

    try {
        const coordinates = "lat=-12.0464&lon=-77.0428";
        const settings = "&units=metric&lang=es&appid=" + API_KEY;

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${WEATHER_URL}/weather?${coordinates}${settings}`),
            fetch(`${WEATHER_URL}/forecast?${coordinates}${settings}`)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        currentWeather.textContent = "Weather information is currently unavailable.";
        forecastContainer.textContent = "Forecast information is currently unavailable.";
        console.error("Weather error:", error);
    }
}

function displayCurrentWeather(data) {
    const container = document.querySelector("#current-weather");
    const icon = data.weather[0].icon;

    container.innerHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${data.weather[0].description}">
            <div>
                <strong>${Math.round(data.main.temp)}°C</strong>
                <p>${data.weather[0].description}</p>
                <p>Feels like ${Math.round(data.main.feels_like)}°C</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.querySelector("#weather-forecast");
    const dailyForecast = {};

    data.list.forEach(item => {
        const localDate = new Date((item.dt + data.city.timezone) * 1000);
        const dateKey = localDate.toISOString().split("T")[0];

        if (!dailyForecast[dateKey]) {
            dailyForecast[dateKey] = {
                date: localDate,
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon,
                description: item.weather[0].description
            };
        } else {
            dailyForecast[dateKey].min = Math.min(dailyForecast[dateKey].min, item.main.temp_min);
            dailyForecast[dateKey].max = Math.max(dailyForecast[dateKey].max, item.main.temp_max);
        }
    });

    const today = new Date(Date.now() + data.city.timezone * 1000)
        .toISOString().split("T")[0];

    const forecastDays = Object.entries(dailyForecast)
        .filter(([date]) => date > today)
        .slice(0, 3);

    container.innerHTML = "";

    forecastDays.forEach(([date, forecast]) => {
        const card = document.createElement("article");
        card.classList.add("weather-forecast-card");

        const day = forecast.date.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC"
        });

        card.innerHTML = `
            <h3>${day}</h3>
            <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="${forecast.description}">
            <p>${forecast.description}</p>
            <p><strong>${Math.round(forecast.max)}°C</strong> / ${Math.round(forecast.min)}°C</p>
        `;

        container.appendChild(card);
    });
}

getWeather();


const spotlightsContainer = document.querySelector("#spotlights-container");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        const eligibleMembers = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const shuffledMembers = eligibleMembers.sort(() => Math.random() - 0.5);
        const selectedMembers = shuffledMembers.slice(0, Math.min(3, shuffledMembers.length));

        displaySpotlights(selectedMembers);

    } catch (error) {
        spotlightsContainer.textContent = "Business spotlights are currently unavailable.";
        console.error("Spotlights error:", error);
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const membership = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="" loading="lazy">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            <span class="member-level">${membership}</span>
        `;

        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();

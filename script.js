const apiKey = "8e141681a4cbc17fede966da7a6a146f"; // Your OpenWeatherMap API key

const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Surat",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Meerut",
  "Faridabad",
  "Rajkot",
  "Kalyan-Dombivli",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Jodhpur",
  "Coimbatore",
  "Warangal",
  "Bhilai",
  "Gwalior",
  "Vijayawada",
  "Mysore",
  "Chandigarh",
  "Bhubaneswar",
  "Siliguri",
  "Rourkela",
  "Guwahati",
  "Jabalpur",
  "Udaipur",
  "Jammu",
];

const internationalCities = [
  "New York",
  "Los Angeles",
  "London",
  "Paris",
  "Berlin",
  "Tokyo",
  "Sydney",
  "Toronto",
  "Dubai",
  "Hong Kong",
  "Singapore",
  "Bangkok",
  "Seoul",
  "Moscow",
  "Beijing",
  "Shanghai",
  "Istanbul",
  "Rio de Janeiro",
  "Mexico City",
  "Cairo",
  "Buenos Aires",
  "Cape Town",
  "Nairobi",
  "Jakarta",
  "Sao Paulo",
  "Lagos",
  "Karachi",
  "Manila",
  "Tehran",
  "Kuala Lumpur",
  "Riyadh",
  "Santiago",
  "Bogota",
  "Lima",
  "Baghdad",
  "Ho Chi Minh City",
  "Warsaw",
  "Budapest",
  "Prague",
  "Vienna",
  "Brussels",
  "Amsterdam",
  "Madrid",
  "Rome",
  "Athens",
  "Stockholm",
  "Zurich",
  "Copenhagen",
  "Oslo",
  "Brisbane",
];

const cityDropdownIndia = document.getElementById("cityDropdownIndia");
const cityDropdownInternational = document.getElementById(
  "cityDropdownInternational"
);
const checkWeatherBtnIndia = document.getElementById("checkWeatherBtnIndia");
const checkWeatherBtnInternational = document.getElementById(
  "checkWeatherBtnInternational"
);
const resetWeatherBtnIndia = document.getElementById("resetWeatherBtnIndia");
const resetWeatherBtnInternational = document.getElementById(
  "resetWeatherBtnInternational"
);
const weatherDisplayIndia = document.getElementById("weatherDisplayIndia");
const weatherDisplayInternational = document.getElementById(
  "weatherDisplayInternational"
);

// Populate the dropdown with city options
const populateDropdown = (dropdown, cities) => {
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    dropdown.appendChild(option);
  });
};

populateDropdown(cityDropdownIndia, indianCities);
populateDropdown(cityDropdownInternational, internationalCities);

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};

const setWeather = (weatherData, isInternational) => {
  const weatherDisplay = isInternational
    ? weatherDisplayInternational
    : weatherDisplayIndia;
  const cityElement = document.createElement("div");
  cityElement.className = "city";

  const weather = weatherData.list[0];
  const temp = Math.round(weather.main.temp);
  const detailedCondition = weather.weather[0].description.toLowerCase();

  // Create and append image
  const weatherImg = document.createElement("img");
  weatherImg.alt = "Weather Image";
  weatherImg.className = "weather-image";

  // Mapping weather descriptions to images
  if (
    detailedCondition.includes("overcast") ||
    detailedCondition.includes("broken clouds")
  ) {
    weatherImg.src = "./Images/overcast.png";
  } else if (
    detailedCondition.includes("light rain") ||
    detailedCondition.includes("moderate rain") ||
    detailedCondition.includes("showers")
  ) {
    weatherImg.src = "./Images/showers.png";
  } else if (detailedCondition.includes("snow")) {
    weatherImg.src = "./Images/snowy.png";
  } else if (
    detailedCondition.includes("heavy rain") ||
    detailedCondition.includes("heavy intensity rain")
  ) {
    weatherImg.src = "./Images/heavy-rains.png";
  } else if (
    detailedCondition.includes("sunny") ||
    detailedCondition.includes("clear sky")
  ) {
    weatherImg.src = "./Images/sunny.png";
  } else if (detailedCondition.includes("clear night")) {
    weatherImg.src = "./Images/clear-night.png";
  } else if (detailedCondition.includes("cloudy night")) {
    weatherImg.src = "./Images/partly-cloudy-night.png";
  } else if (detailedCondition.includes("cloudy")) {
    weatherImg.src = "./Images/cloudy.png";
  } else if (detailedCondition.includes("partly sunny")) {
    weatherImg.src = "./Images/partly-sunny.png";
  } else if (detailedCondition.includes("rain with sun")) {
    weatherImg.src = "./Images/rain-with-sun.png";
  } else if (detailedCondition.includes("thunderstorm")) {
    weatherImg.src = "./Images/thunderstorm.png";
  } else if (detailedCondition.includes("mist")) {
    weatherImg.src = "./Images/mist.png";
  } else if (detailedCondition.includes("scattered clouds")) {
    weatherImg.src = "./Images/scattered-clouds.png";
  } else {
    weatherImg.src = ""; // Clear image source for other conditions
  }

  // Clear previous content
  cityElement.innerHTML = `
    <h2>${weatherData.city.name}</h2>
    <p>${temp}°C</p>
    <p>${weather.weather[0].description}</p>
  `;

  cityElement.prepend(weatherImg); // Add image above the text content

  // Clear previous weather information
  weatherDisplay.innerHTML = "";
  weatherDisplay.appendChild(cityElement);
};

const updateWeather = async (dropdown, isInternational) => {
  const selectedCity = dropdown.value;
  if (selectedCity) {
    const weatherData = await getWeather(selectedCity);
    if (weatherData) {
      setWeather(weatherData, isInternational);
    } else {
      console.error(`No data returned for ${selectedCity}`);
    }
  }
};

const resetWeather = (isInternational) => {
  const weatherDisplay = isInternational
    ? weatherDisplayInternational
    : weatherDisplayIndia;
  const dropdown = isInternational
    ? cityDropdownInternational
    : cityDropdownIndia;

  // Clear weather display
  weatherDisplay.innerHTML = "";

  // Reset dropdown to default
  dropdown.selectedIndex = 0; // Assuming the first option is the default
};

checkWeatherBtnIndia.addEventListener("click", () =>
  updateWeather(cityDropdownIndia, false)
);
checkWeatherBtnInternational.addEventListener("click", () =>
  updateWeather(cityDropdownInternational, true)
);

resetWeatherBtnIndia.addEventListener("click", () => resetWeather(false));
resetWeatherBtnInternational.addEventListener("click", () =>
  resetWeather(true)
);

const cities = {
  "New York": "America/New_York",
  London: "Europe/London",
  Mumbai: "Asia/Kolkata",
  Sydney: "Australia/Sydney",
  Dubai: "Asia/Dubai",
};

const worldClockContainer = document.getElementById("worldClock");

const updateClock = () => {
  const now = new Date();
  worldClockContainer.innerHTML = "";

  Object.keys(cities).forEach((city) => {
    const timeZone = cities[city];
    const options = {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    const time = new Intl.DateTimeFormat("en-US", options).format(now);

    const clockDiv = document.createElement("div");
    clockDiv.className = "clock";
    clockDiv.textContent = `${city}: ${time}`;

    worldClockContainer.appendChild(clockDiv);
  });
};

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();

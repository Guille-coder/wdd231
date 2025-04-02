async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  }
  
  async function getCurrentWeather() {
    const apiKey = '26dd370543cd4502a3802905252503'; 
    const city = 'Piura';               
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    try {
      const data = await fetchData(url);
  
      if (data.error) {
        document.getElementById('weather-info').innerHTML = `<p>Error: ${data.error.message}</p>`;
        return;
      }
  
      document.getElementById('weather-info').innerHTML = `
        <h3>${data.location.name}, ${data.location.country}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
      `;
    } catch (error) {
      document.getElementById('weather-info').innerHTML = `<p>Unable to fetch weather data.</p>`;
    }
  }
  
  async function getWeatherForecast() {
    const apiKey = '26dd370543cd4502a3802905252503'; 
    const city = 'Piura';              
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  
    try {
      const data = await fetchData(url);
  
      if (data.error) {
        document.getElementById('forecast-info').innerHTML = `<p>Error: ${data.error.message}</p>`;
        return;
      }
  
      let forecastHTML = '';
      data.forecast.forecastday.forEach(day => {
        forecastHTML += `
          <div class="forecast-day">
            <h4>${day.date}</h4>
            <p>Max Temp: ${day.day.maxtemp_c}°C</p>
            <p>Min Temp: ${day.day.mintemp_c}°C</p>
            <p>Condition: ${day.day.condition.text}</p>
            <img src="${day.day.condition.icon}" alt="Forecast Icon">
          </div>
        `;
      });
  
      document.getElementById('forecast-info').innerHTML = forecastHTML;
    } catch (error) {
      document.getElementById('forecast-info').innerHTML = `<p>Unable to fetch forecast data.</p>`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    getCurrentWeather();
    getWeatherForecast();
  });  
  async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching json members:", error);
    }
}
const membersContainer = document.querySelector("#memberCards");


function displayMembers(members) {
    membersContainer.innerHTML = "";
    const filteredMembers = members.filter(member => member.membership === 2 || member.membership === 3);
    const membersPool = [...filteredMembers];
    const randomMembers = [];
    const count = Math.min(3, membersPool.length);
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * membersPool.length);
        randomMembers.push(membersPool.splice(randomIndex, 1)[0]);
    }
    randomMembers.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = `
            <h3>Membership Level: ${member.membership === 2 ? 'Silver' : 'Gold'}</h3>
            <h3>${member.name}</h3>
            <div class="member-information">
                <div>
                <img src="${member.image}" alt="${member.name} logo">
                </div>
                <div>
                    <p><span>Address:</span> ${member.address}</p>
                    <p><span>Phone:</span> ${member.phone}</p>
                    <p><span>Email:</span> ${member.email}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            </div>
        `;
        membersContainer.appendChild(card);
    });
}

fetchMembers();
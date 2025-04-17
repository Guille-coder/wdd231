document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('places-container');
  const searchInput = document.getElementById('search');
  const dialog = document.getElementById('details-dialog');
  const dialogContent = document.getElementById('dialog-content');
  const closeBtn = document.getElementById('close-dialog');

  const API_KEY = '660f6c14424c0845e3dbff6705f1f0cd'; // API key 
  let places = [];

  try {
    const response = await fetch('data/places.json');
    const data = await response.json();
    places = data.places;
    renderPlaces(places);
  } catch (error) {
    console.error('Error loading places:', error);
  }

  function renderPlaces(filteredPlaces) {
    container.innerHTML = '';
    filteredPlaces.forEach(async place => {
      const card = document.createElement('div');
      card.className = 'place-card';

      // Cargar clima
      let weatherHTML = '<p>Loading weather...</p>';
      try {
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place.city}&units=metric&appid=${API_KEY}&lang=en`);
        const weatherData = await weatherRes.json();
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        weatherHTML = `<p><strong>Weather:</strong> ${temp}°C, ${description}</p>`;
      } catch (error) {
        weatherHTML = '<p><strong>Weather:</strong> Not available</p>';
      }

      card.innerHTML = `
        <img src="${place.image}" alt="${place.place}">
        <div class="place-card-content">
          <h2>${place.place}</h2>
          ${weatherHTML}    
          <button class="learn-more">See Details</button>
        </div>
      `;

      card.querySelector('.learn-more').addEventListener('click', () => {
        dialogContent.innerHTML = `
        <img src="${place.image}" alt="${place.place}">
          <h2>${place.place}</h2>
          <p><strong>Description:</strong> ${place.description}</p>
          <p><strong>Location:</strong> ${place.location}</p>
          <p><strong>Attractions:</strong> ${place.attractions.join(', ')}</p>
        `;
        dialog.showModal();
      });

      container.appendChild(card);
    });
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = places.filter(place => place.place.toLowerCase().includes(query));
    renderPlaces(filtered);
  });

  closeBtn.addEventListener('click', () => {dialog.close();});
});
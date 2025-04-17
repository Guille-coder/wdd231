const apiKey = "660f6c14424c0845e3dbff6705f1f0cd"; // Replace with your actual API key
const container = document.getElementById("clima");

fetch('data/places.json')
  .then(res => res.json())
  .then(data => {
    const randomPlaces = data.places.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomPlaces.forEach((place, index) => {
      try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place.city},PE&units=metric&lang=en&appid=${apiKey}`)
          .then(res => res.json())
          .then(weather => {
            const card = document.createElement("div");
            card.classList.add("tarjeta");

            const dialogId = `dialog-${index}`;

            card.innerHTML = `
            <img src="${place.image}" alt="${place.place}" style="width:100%; height:auto; border-radius:10px; margin-bottom:0.5rem;">
            <h2>${place.place}</h2>
              <p><strong>Weather:</strong> ${weather.weather[0].description}, ${Math.round(weather.main.temp)}°C
                <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather icon">
              </p>
              <button class="learn-more" onclick="document.getElementById('${dialogId}').showModal()">More details</button>

              <dialog id="${dialogId}">
              <div>
                <img src="${place.image}" alt="${place.place}" style="width:100%; height:auto; border-radius:10px; margin-bottom:0.5rem;">
                <h2>${place.place} (${place.city})</h2>
                <h3>Description</h3>
                <p>${place.description}</p>
                <h3>Location</h3>
                <p>${place.location}</p>
                <h3>Attractions</h3>
                <p> ${place.attractions.join(", ")}</p>
                <button class="close-dialog" onclick="document.getElementById('${dialogId}').close()">Close</button>
               </div>
              </dialog>
            `;

            container.appendChild(card);
          });
      } catch (error) {
        console.error("Error loading weather for", place.city, error);
      }
    });
});
var typed = new Typed('#typed', {
    strings: ["a journey to the extraordinary.", "discover the essence of authenticity.", "adventure, history, and flavor in one destination.","where every path tells a story."],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true
});
let interestingFacts = [];
    let shownFacts = [];

// Load the facts from the JSON file
fetch('data/interesting-facts.json')
    .then(response => response.json())
    .then(data => {
    interestingFacts = data;
    showFact(); // Show an initial fact when the page loads
    })

    .catch(error => {
        console.error('Error loading the JSON:', error);
    });

// Function to show a random fact
function showFact() {
    // Check if all facts have been shown
    if (shownFacts.length === interestingFacts.length) {
    alert("You've seen all the interesting facts!");
    return;
    }
    let randomIndex;
    // Ensure the fact is not repeated
    do {

        randomIndex = Math.floor(Math.random() * interestingFacts.length);
    }while (shownFacts.includes(randomIndex));

    // Display the fact
    document.getElementById('fact').textContent = interestingFacts[randomIndex].fact;

    // Mark the fact as shown
    shownFacts.push(randomIndex);
}




// FORMULARIO
const formulario = document.getElementById("format");
const inputEmail = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const botonBorrar = document.getElementById("borrar");

const emailGuardado = localStorage.getItem("email");

  if (emailGuardado) {
      mensaje.textContent = `Thanks for subscribing, ${emailGuardado}!`;
      mensaje.style.display = "block";
      formulario.classList.add("hidden");
      botonBorrar.classList.remove("hidden");
  }
  
  formulario.addEventListener("submit", function(event) {       
      event.preventDefault(); // Evita que la página se recargue
      const email = inputEmail.value;
      localStorage.setItem("email", email); // Guarda en Local Storage
      mensaje.textContent = `Thanks for subscribing, ${email}!`;
      mensaje.style.display = "block";
      formulario.classList.add("hidden");
      botonBorrar.classList.remove("hidden");
  });

  botonBorrar.addEventListener("click", function() {
      localStorage.removeItem("email"); // Elimina el correo guardado
      mensaje.style.display = "none";
      formulario.classList.remove("hidden");
      botonBorrar.classList.add("hidden");
  });
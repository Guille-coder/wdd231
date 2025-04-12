document.addEventListener("DOMContentLoaded", function() {
    fetch('data/places.json')
        .then(response => response.json())
        .then(data => {
            const cardsGrid = document.querySelector('.cards-grid');
            
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                
                const background = document.createElement('div');
                background.classList.add('card-bg');
                background.style.backgroundImage = `url(${item.image})`;
                
                card.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button>Learn More</button>
                `;
                
                card.prepend(background);
                cardsGrid.appendChild(card);
            });
        })

        .catch(error => {
            console.error('Error fetching the items data:', error);
        });
});
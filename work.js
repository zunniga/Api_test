// URL base de la API
const apiURLs = 'https://rickandmortyapi.com/api/character';

// Función para obtener los personajes
function fetchCharacters(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCharacters(data.results);
            // Actualizar el botón "Load More" con la URL de la siguiente página
            document.getElementById('load-more').dataset.nextUrl = data.info.next;
        })
        .catch(error => {
            console.error('Error al consumir la API:', error);
        });
}

// Función para mostrar los personajes en la página
function displayCharacters(characters) {
    const container = document.getElementById('characters');
    characters.forEach(character => {
        const charDiv = document.createElement('div');
        charDiv.className = 'character';

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;
        img.style.width = '100px'; // Ajusta el tamaño de las imágenes
        img.style.height = '100px';

        const name = document.createElement('div');
        name.textContent = character.name;
        name.className = 'character-name';

        charDiv.appendChild(img);
        charDiv.appendChild(name);
        container.appendChild(charDiv);
    });
}

// Manejar el botón "Load More"
document.getElementById('load-more').addEventListener('click', function() {
    const nextUrl = this.dataset.nextUrl;
    if (nextUrl) {
        fetchCharacters(nextUrl);
    } else {
        alert('No more pages to load.');
    }
});

// Cargar la primera página al iniciar
fetchCharacters(apiURL);

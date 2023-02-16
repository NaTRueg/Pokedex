const searchInput = document.querySelector('#search-input');
const resultsList = document.querySelector('#results-list');
const detailsContainer = document.querySelector('#details-container');
const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=1279';
const pokemonName = document.querySelector('#pokemonName');
const pokemonImage = document.querySelector('#pokemonImage');

let pokemons = [];

function getDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      pokemonImage.src = data.sprites.front_default;
    });
}


fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    pokemons = data.results;
  });


searchInput.addEventListener('input', e => {
  const searchTerm = e.target.value.toLowerCase();
  
  if (searchTerm === '') {
    resultsList.innerHTML = '';
    return;
  }

  const filteredPokemons = pokemons.filter(pokemon => pokemon.name.startsWith(searchTerm));

  resultsList.innerHTML = '';


filteredPokemons.forEach(pokemon => {
  const li = document.createElement('li');
  li.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  resultsList.appendChild(li);


  li.addEventListener('click', () => {
    getDetails(pokemon.url);
  });
});
});
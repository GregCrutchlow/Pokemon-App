async function searchPokemon(searchTerm) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Return the data
        return data;
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
}

// Info for evolution chain
async function searchPokemonTwo(searchTerm) {
    const apiGame = `https://pokeapi.co/api/v2/pokemon-species/${searchTerm}`;
    try {
			const response = await fetch(apiGame);
			const dataTwo = await response.json();
			return dataTwo;
		} catch (error) {
			console.error(error);
		}
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const data = await searchPokemon(searchTerm);
    const dataTwo = await searchPokemonTwo(searchTerm)
    // Do something with the data
    const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const pokemonImage = data.sprites.front_default;
    const pokemonType = data.types[0].type.name;
    const pokemonHtml = `
    <h2>${pokemonName}</h2>
    <img src="${pokemonImage}" class="pokemon-img" alt="${pokemonName}" />
    <p>Type: ${pokemonType}</p>
    `;
    searchResults.innerHTML = pokemonHtml;
    searchInput.value = '';
    console.log(data);
    console.log(dataTwo);
});

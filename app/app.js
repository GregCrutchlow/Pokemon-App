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
	try {
		const [data, dataTwo] = await Promise.all([searchPokemon(searchTerm), searchPokemonTwo(searchTerm)]);
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
	} catch (error) {
		console.error(error);
	}
});

// TODO: Create a quiz to determine what starter pokemon you should start with based on several questions
	// TODO 1.Based on answers, multiply the final total from all questions (they have a numerical value to them) to determine what starter from which game to select
	// TODO 2. When Starter is determined, have the final results clickable to take them to a detailed page of the pokemon and the "main" portion of the app. 
		// TODO Store the result in the local data if possible, have a reset button to remove the local data cache for the starter pokemon
		
// TODO: "Main" page 
	// TODO 1. Searchable bar that can search for Pokemon based on name or number (COMPLETE)
	// TODO 2. Put buttons for previous pokemon in the list and the next pokemon in the list
	// TODO 3. "Compare" button to compare two pokemon (NOT SURE OF)
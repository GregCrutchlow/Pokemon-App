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
const previousEvo = document.getElementById('previous-evolution');
const nextEvo = document.getElementById('next-evolution');

searchForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const searchTerm = searchInput.value.toLowerCase();
	try {
		const [data, dataTwo] = await Promise.all([searchPokemon(searchTerm), searchPokemonTwo(searchTerm)]);
		// Do something with the data
		const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
		const pokemonImage = data.sprites.front_default;
		const pokemonType = data.types[0].type.name;
		const pokemonHP = data.stats[0].base_stat;
		const pokemonAtt = data.stats[1].base_stat;
		const pokemonDef = data.stats[2].base_stat;
		const pokemonSA = data.stats[3].base_stat;
		const pokemonSD = data.stats[4].base_stat;
		const pokemonSpeed = data.stats[5].base_stat;
		const evolutionChainUrl = dataTwo.evolution_chain.url;

		const evolutionChainResponse = await fetch(evolutionChainUrl);
		const evolutionChainData = await evolutionChainResponse.json();
		
		const evolutionPrevious = `
		<h3>Previous Evolution: ${evolutionChainData.chain.species.name}</h3>`;

		const evolutionNext = `
		<h3>Next Evolution: ${evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name}</h3>`;

		const pokemonHtml = `
		<div class="name-info">
			<h2>${pokemonName}</h2>
			<p>Type: ${pokemonType}</p>
		</div>
        <img src="${pokemonImage}" class="pokemon-img" alt="${pokemonName}" />
		<div class="stats-display">
			<div class="stat1">
				<p>HP: ${pokemonHP}</p>
				<p>Attack: ${pokemonAtt}</p>
				<p>Defense: ${pokemonDef}</p>
			</div>
			<div class="stat2">
				<p>Special-Attack: ${pokemonSA}</p>
				<p>Special-Defense: ${pokemonSD}</p>
				<p>Speed: ${pokemonSpeed}</p>
			</div>
		</div>
        `;
		searchResults.innerHTML = pokemonHtml;
		previousEvo.innerHTML = evolutionPrevious;
		nextEvo.innerHTML = evolutionNext;

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
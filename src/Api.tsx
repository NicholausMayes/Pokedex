export async function fetchPokemon(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok){
            throw new Error(`Https Error. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Error Fetching Pokemon", error);
        throw error;
    }
}

export async function fetchAbilityDetails(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTPS error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching ability details", error);
      throw error;
    }
  }
  
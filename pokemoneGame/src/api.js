function api(name) {
  return `https://pokeapi.co/api/v2/pokemon/${name}/`;
}

let pokemons = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
];

export { pokemons, api };

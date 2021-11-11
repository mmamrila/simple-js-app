let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Gengar', height: '1.5', type: ['ghost', 'poison']},
    {name: 'Onix', height: '8.8', type: ['rock', 'ground']},
    {name: 'Magnemite', height: '0.3', type: ['electric', 'steel']}
  ];

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('name-button');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

//Write's pokemon's name and height in DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

  if (pokemon.height > 5){
    document.write(' - Wow, that\'s big!');
  }
});

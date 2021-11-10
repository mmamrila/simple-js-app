let pokemonList = [
  {name: 'Gengar', height: '1.5', type: ['ghost', 'poison']},
  {name: 'Onix', height: '8.8', type: ['rock', 'ground']},
  {name: 'Magnemite', height: '0.3', type: ['electric', 'steel']}
];

//Write's pokemon's name and height in DOM
pokemonList.forEach(function(pokemon) {
  document.write('<br>' + pokemon.name + ': ' + '(height: ' + pokemon.height + ')');

  if (pokemon.height > 5){
    document.write(' - Wow, that\'s big!');
  }
});

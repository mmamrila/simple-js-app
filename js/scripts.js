let pokemonList = [
  {name: 'Gengar', height: '1.5', type: ['ghost', 'poison']},
  {name: 'Onix', height: '8.8', type: ['rock', 'ground']},
  {name: 'Magnemite', height: '0.3', type: ['electric', 'steel']}
];

for (let i=0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ': ' + '(height: ' + pokemonList[i].height + ')');
}

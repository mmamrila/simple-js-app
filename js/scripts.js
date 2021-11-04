let pokemonList = [
  {name: 'Gengar', height: '1.5', type: ['ghost', 'poison']},
  {name: 'Onix', height: '8.8', type: ['rock', 'ground']},
  {name: 'Magnemite', height: '0.3', type: ['electric', 'steel']}
];

//Write's pokemon's name and height in DOM
for (let i=0; i < pokemonList.length; i++) {
  document.write('<br>' + pokemonList[i].name + ': ' + '(height: ' + pokemonList[i].height + ')');

  if (pokemonList[i].height > 5){
    document.write(' - Wow, that\'s big!');
  }

}

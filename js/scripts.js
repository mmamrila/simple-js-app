let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modal = document.querySelector('#pokedex');

  function add(pokemon) {
    if (typeof pokemon === "object") {
      // &&
    //   "name" in pokemon  &&
    //    "detailsUrl" in pokemon
    // ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);



    button.addEventListener('click', function(event) {
      console.log("pokemon button clicked");
      showModal(pokemon, modal);
    });
  }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.image = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }




  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // show modal content
  function showModal(pokemon) {
    console.log("show modal running");
    console.log(pokemon.name);
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    console.log(modalTitle);

    //clear existing content from modal
    // modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let nameElement = $('<h1>' + pokemon.name + '</h1>');

    //create img in modal content
    let imageElement = $('<img class="modal-img" src="" >');
    imageElement.attr("src", pokemon.image);

    //create element for height in modal content
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    //create element for weight in modal content
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    // create element for types in modal content
    let typesElement = $("<p>" + "Types: " + pokemon.types + "</p>");

    // create element for abilities in modal content
    let abilitiesElement = $("<p>" + "Abilities: " + pokemon.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    $('#pokedex').modal();
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal
  };
})();

  pokemonRepository.loadList().then(function() {
  //Write's pokemon's name and height in DOM
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

    });
});

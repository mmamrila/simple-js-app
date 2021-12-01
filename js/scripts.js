let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon // &&
      // "detailsUrl" in pokemon
    ) {
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
    let button-primary = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-primary');
    listPokemon.appendChild(button-primary);
    pokemonList.appendChild(listPokemon);

    button.addEventListener('click', function(event) {
      showDetails(pokemon);
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      document.querySelector('#pokemonName').innerHTML = pokemon.name
      document.querySelector('#pokemonHeight').innerHTML = pokemon.height
      document.querySelector('#pokemonImg').setAttribute("src", pokemon.imageUrl)
      modal.style.display = 'block'
    });
  }

  closeButton.addEventListener('click', function(event) {
    modal.style.display = 'none'
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display == 'block') {
      modal.style.display = 'none';
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target !== modal && modal.style.display == 'block') {
      modal.style.display = 'none';
    }
  });

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

  pokemonRepository.loadList().then(function() {
  //Write's pokemon's name and height in DOM
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

    });
});

// show modal content
function showModal(item) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');
  let $modalContainer = $('#modal-container');

  //clear existing content from modal
  modalHeader.empty();
  modalTitle.empty();
  modalBody.empty();

  //create element for name in modal content
  let nameElement = $('<h1>' + item.name + '</h1>');

  //create img in modal content
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr("src", item.imageUrlFront);
  let imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr("src", item.imageUrlBack);

  //create element for height in modal content
  let heightElement = $("<p>" + "Height: " + item.height + "</p>");

  //create element for weight in modal content
  let weightElement = $("<p>" + "Weight: ") + item.wight + "</p>");

  // create element for types in modal content
  let typesElement = $("<p>" + "Types: " + item.types + "</p>");

  // create element for abilities in modal content
  let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);
}

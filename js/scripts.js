let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modal = document.querySelector('#pokedex');

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {

    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    let sprite = document.createElement('img');
    button.innerText = pokemon.name;
    button.classList.add('button');
    button.classList.add('btn');
    button.appendChild(sprite);
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener('click', function() {
      console.log('clicked');
      showDetails(pokemon, modal);
    });


    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
    })
      .then(function (details) {
      pokemon.image = details.sprites.front_default;
      sprite.setAttribute('src', pokemon.image);
    }).catch(function (e) {
      console.error(e);
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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
    })
      .then(function (details) {
      pokemon.image = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }




  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // show modal content
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    //clear existing content from modal
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let nameElement = $('<h1 class="text-capitalize">' + pokemon.name + '</h1>');

    //create img in modal content
    let imageElement = $('<img class="modal-img" src="" >');
    imageElement.attr('src', pokemon.image);

    //create element for height in modal content
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    //create element for weight in modal content
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

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

document.querySelector('#search-term').addEventListener('input', e => {
  let searchTerm = e.target.value;
  let buttons = document.querySelectorAll('.button');

  for (let i = 0; i < buttons.length ; i ++) {
    if (buttons[i].innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      buttons[i].style.display = 'inline-block';
      } else {
      buttons[i].style.display = 'none';
    }
  }

})

  pokemonRepository.loadList().then(function() {
  //Write's pokemon's name and height in DOM
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

    });
});

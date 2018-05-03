document.addEventListener("DOMContentLoaded", function() {});

//dom manipulation
//************************************************************************/
//update what pokemon show based on search content
//toggle which sprite is showing

let searchInputField = document.getElementById("pokemon-search-input");
let searchResultsDiv = document.getElementById("pokemon-container");

searchInputField.addEventListener("input", e => {
  //filter Pokemon.all by current value of searchInputField
  let filteredList = Pokemon.all.filter(pokemon => {
    //return those that with names that include the value in the searchInputField
  return pokemon.name.includes(searchInputField.value);
  }); // end of filter
// For each item in filteredList, display in the dom

mappedLis = filteredList.map(pokemon => pokemon.render());

let joinedLis = mappedLis.join(" ");
let finalString = "<ul>" + joinedLis + "</ul>";

searchResultsDiv.innerHTML = joinedLis;
}); //end of searchInputField.addEventListener

//be able to toggle which sprite is showing when sprite is clicked
searchResultsDiv.addEventListener("click", e => {
  console.log("event target is:", e.target)
  if (e.target.classList.contains("sprite")) {
    // grab pokemon instance
    let targetPokemon = Pokemon.all.filter(pokemon => {
      return pokemon.order == e.target.dataset.pokenum; 
    })[0]; // end of filter with the 0th index selected
// toggle with activeSprite
targetPokemon.spriteToggle();
e.target.src = targetPokemon.activeSprite
  } // end of if statement
});


//api interaction
//************************************************************************/

let allPokemon = fetch("http://localhost:8000/db.json");
allPokemon.then(response => response.json()).then(json => {
  json.pokemons.forEach(pokemon => {
    new Pokemon(pokemon.name, pokemon.order, pokemon.sprites);
  }); // end of forEach
}); // end of .then chain

//data manipulation
//************************************************************************/
class Pokemon {
  constructor(name, order, sprites) {
    this.name = name;
    this.order = order;
    this.frontSprite = sprites.front;
    this.backSprite = sprites.back;
    this.activeSprite = this.frontSprite;

    Pokemon.all.push(this);
  }
  //render method
  //should have a method called 'render' that returns a string representing an 
  // li HTML element containing the Pokemon's name and image.

  // adding data- adds the property "pokenum to the target method dataset"
  render() {
    return `<li><img data-pokenum="${this.order}" class="sprite" src ="${this.activeSprite}"/>${this.name}</li>`;
  }
  //toggle that joint
  spriteToggle() {
    if (this.activeSprite === this.frontSprite) {
      this.activeSprite = this.backSprite;
      // debugger
    } else {
      this.activeSprite = this.frontSprite;
    }
  }

}

Pokemon.all = [];

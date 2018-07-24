const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',init)

function init(){
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => TrainerCardRender(json))
  .then(detectReleaseClick())
}//end of init

function createTrainerContainer (item) {
  trainerDiv = document.createElement('div')
  trainerDiv.id = item.id
  trainerDiv.className = "card"
  trainerDiv.innerHTML = `<p> ${item.name}  </p>`
  return trainerDiv
}

function createAddButton() {
  submitButton = document.createElement('button')
  submitButton.innerText = 'Add Pokemon!!!!!'
  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    createPokemon()
  })
  return submitButton
}


function createPokemon() {
  fetch(POKEMONS_URL, {
  method:"post",
  })
  .then(res => res.json())
  .then(res => {
    console.log('Deleted:', res.message)
    return res
  })
  .catch(err => console.error(err))
}

function createPokemonsList(trainer) {
  ulElement = document.createElement('ul')

  for (let i = 0; i < trainer.pokemons.length; i++) {
    iThPokemon = trainer.pokemons[i]
    catchPokemon(iThPokemon)
    ulElement.append(pokemonInfo,buttonX)
  }
  return ulElement
}

function catchPokemon(iThPokemon){
  pokemonInfo = document.createElement('li')
  pokemonInfo.id = iThPokemon.id
  pokemonInfo.innerHTML = `${iThPokemon.nickname} (${iThPokemon.species})`
  buttonX = document.createElement('button')
  buttonX.innerText = "Release"
}

function detectReleaseClick (){
  let cards = document.getElementsByClassName('card')
  for(card of cards) {
    addEventListener('click', function(e){
      if(e.target.innerText === 'Release') {
        let pokemonId = e.target.parentNode.id
        deletePokemon(pokemonId)
        // let elementToRemove = e.target.parentNode
        // document.getElementBy
      }
    })
  }
}


function deletePokemon(id){
    fetch(POKEMONS_URL + `/${id}` , {
    method:"delete",
    })
    .then(res => res.json())
    .then(res => {
      console.log('Deleted:', res.message)
      return res
    })
    .catch(err => console.error(err))
}


function TrainerCardRender(data){
  for (let i = 0; i < data.length; i++) {
    trainerDiv = createTrainerContainer(data[i])
    trainerDiv.append(createAddButton(),createPokemonsList(data[i]))
    document.body.appendChild(trainerDiv)
    console.log("rendered cards")
  }//end of trainerCardRender
}

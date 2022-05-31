import charactersArr from "./data/data.js";
const characterContainer = document.querySelector(".character-container")
const searchInput = document.querySelector("#search")

const createCards = (array) => {
  const characterHTML = array.map((character) => {
    return (
    `
    <div class="character-card">
      <h1 class="character-card__name">${character.firstName} ${character.lastName}</h1>
      <img class="character-card__image" src=${character.imageUrl} alt="Image of ${character.firstName}">
      <h2 class="character-card__title>${character.title}</h2>
      <h3 class="character-card__family">${character.family}</h3>
    </div>
    `
    )
  }).join("")

  return characterHTML
}

const getSearchInput = (event) => {
  return event.target.value
}

const filterBySearch = (event) => {
  const searchTerm = getSearchInput(event)
 
  const filteredArray = charactersArr.filter((character) => {

    return character.firstName.includes(searchTerm)
  })
  characterContainer.innerHTML = createCards(filteredArray)
}

const characterCards = createCards(charactersArr)
characterContainer.innerHTML = characterCards
searchInput.addEventListener("input", filterBySearch)
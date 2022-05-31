//---------------------------Import from Data File-------------------------//

import charactersArr from "./data/data.js";

//---------------------------Dom Elements-------------------------//
const characterContainer = document.querySelector(".character-container");
const searchInput = document.querySelector("#search");
const checkboxes = document.querySelectorAll(".nav__checkbox");

//---------------------------Global Variables-------------------------//
const checkedArray = [];

//---------------------------Functions-------------------------//
const createCards = (array) => {
  const characterHTML = array
    .map((character) => {
      return `
    <div class="character-card">
      <h1 class="character-card__name">${character.firstName} ${character.lastName}</h1>
      <img class="character-card__image" src=${character.imageUrl} alt="Image of ${character.firstName}">
      <h2 class="character-card__title">${character.title}</h2>
      <h3 class="character-card__family">${character.family}</h3>
    </div>
    `;
    })
    .join("");

  return characterHTML;
};

const getSearchInput = (event) => {
  return event.target.value;
};

const filterBySearch = (event) => {
  const searchTerm = getSearchInput(event);

  const filteredArray = charactersArr.filter((character) => {
    return (
      character.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.family.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  characterContainer.innerHTML = createCards(filteredArray);
};

const addToCheckboxArray = (event) => {
  if (!checkedArray.includes(event.target.id)) {
    checkedArray.push(event.target.id);
  } else if (checkedArray.includes(event.target.id)) {
    const index = checkedArray.indexOf(event.target.id);
    checkedArray.splice(index, 1);
  }
};

const filterByCheckbox = (event) => {
  addToCheckboxArray(event);
  const filteredArrayByCheckbox = getFilteredArray(charactersArr, checkedArray);
  if (checkedArray.length < 1) {
    characterContainer.innerHTML = createCards(charactersArr);
  } else {
    characterContainer.innerHTML = createCards(filteredArrayByCheckbox);
  }
};

const getFilteredArray = (array, checkArray) => {
  const filteredArrayByCheckbox = array.filter((character) => {
    return (
      character.family.toLowerCase().includes(checkArray[0]) ||
      character.family.toLowerCase().includes(checkArray[1]) ||
      character.family.toLowerCase().includes(checkArray[2]) ||
      character.family.toLowerCase().includes(checkArray[3])
    );
  });
  return filteredArrayByCheckbox;
};
//---------------------------Creation of Elements-------------------------//

const characterCards = createCards(charactersArr);

//---------------------------Change Inital Inner HTML----------------------//
characterContainer.innerHTML = characterCards;

//---------------------------Listeners-------------------------------------//
searchInput.addEventListener("input", filterBySearch);
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filterByCheckbox)
);

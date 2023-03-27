import { checkboxesCreation, filterByName, categoryFilter, createEventCards } from "./functions.js";
const search = document.querySelector('#search');
const cardsContainer = document.getElementById('cards_box');
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            console.log(eventList);
            createEventCards(eventList, cardsContainer)
            checkboxesCreation(eventList, checksContainer);
            search.addEventListener('input', executeFilters(eventList))
            checksContainer.addEventListener('change', executeFilters(eventList))
        })
        .catch(error => console.log(error));
};
obtainData();

function executeFilters(array) {
    let firstStep = filterByName(array, search.value);
    let secondStep = categoryFilter(firstStep);
    createEventCards(secondStep, cardsContainer);
}

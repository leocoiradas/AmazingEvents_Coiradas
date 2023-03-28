import { checkboxesCreation, filterByName, categoryFilter, createEventCards } from "./functions.js";
const search = document.querySelector('#search');
const cardsContainer = document.getElementById('cards_box');
async function filterCards() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            function executeFilters() {
                let firstStep = filterByName(eventList, search.value);
                let secondStep = categoryFilter(firstStep);
                createEventCards(secondStep, cardsContainer);
            }
            search.addEventListener('input', executeFilters)
            checksContainer.addEventListener('change', executeFilters)
            checkboxesCreation(eventList, checksContainer);
            createEventCards(eventList, cardsContainer)
        })
        .catch(error => console.log(error));
};
filterCards();


/*async function filterCards() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            search.addEventListener('input', executeFilters)
            checksContainer.addEventListener('change', executeFilters)
            checkboxesCreation(eventList, checksContainer);
            createEventCards(eventList, cardsContainer)
        })
        .catch(error => console.log(error));
};

function executeFilters() {
                let firstStep = filterByName(eventList, search.value);
                let secondStep = categoryFilter(firstStep);
                createEventCards(secondStep, cardsContainer);
            }
filterCards();*/


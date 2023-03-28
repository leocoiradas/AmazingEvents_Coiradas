import { checkboxesCreation, filterByName, categoryFilter, createEventCards, upcomingEvents } from "./functions.js";
let cardsContainer = document.getElementById('cards_box');
let search = document.getElementById('search');
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            const currentDate = data.currentDate
            function executeFilters() {
                let futureEvents = upcomingEvents(eventList, currentDate)
                let firstStep = filterByName(futureEvents, search.value);
                let secondStep = categoryFilter(firstStep);
                createEventCards(secondStep, cardsContainer);
            }
            search.addEventListener('input', executeFilters);
            checksContainer.addEventListener('change', executeFilters);
            checkboxesCreation(eventList, checksContainer);
            createEventCards(eventList, cardsContainer)
        }).catch(error => console.log(error));
};
obtainData();


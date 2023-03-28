import { previousEvents, checkboxesCreation, filterByName, categoryFilter, createEventCards } from "./functions.js";
let cardsContainer = document.getElementById('cards_box');
let search = document.getElementById('search');
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            const currentDate = data.currentDate
            let pastEvents = previousEvents(eventList, currentDate)
            console.log(pastEvents);
            function executeFilters() {
                console.log(pastEvents);
                let firstStep = filterByName(pastEvents, search.value);
                let secondStep = categoryFilter(firstStep);
                createEventCards(secondStep, cardsContainer);
            }
            search.addEventListener('input', executeFilters);
            checksContainer.addEventListener('change', executeFilters);
            checkboxesCreation(pastEvents, checksContainer);
            createEventCards(pastEvents, cardsContainer)
        }).catch(error => console.log(error));
};
obtainData();


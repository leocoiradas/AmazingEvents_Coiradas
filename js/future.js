import { checkboxesCreation, filterByName, categoryFilter, createEventCards, upcomingEvents } from "./functions.js";
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            let currentDate = data.currentDate
            upcomingEvents(eventList);
            checkboxesCreation(eventList, checksContainer);
            search.addEventListener('input', executeFiltersFuture);
            checksContainer.addEventListener('change', executeFiltersFuture);
            executeFiltersFuture(eventList);
        }).catch(error => console.log(error));
};
obtainData();

function executeFiltersFuture(array){
    let cardsContainer = document.getElementById('cards_box');
    let search= document.getElementById('search');
    let futureEvents= upcomingEvents(array)
    let firstStep= filterByName(futureEvents, search.value);
    let secondStep= categoryFilter(firstStep);
    createEventCards(secondStep, cardsContainer);
}
import { previousEvents, checkboxesCreation, filterByName, categoryFilter, createEventCards } from "./functions.js";
let cardsContainer = document.getElementById('cards_box');
let search = document.getElementById('search');
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            const currentDate = data.currentDate
            search.addEventListener('input', executeFilters);
            checksContainer.addEventListener('change', executeFilters);
            //Nota, se declararon las siguientes variables y funciones aquí ya que después de varias pruebas esta fué la única manera de hacer que la creación de tarjetas y ejecución de filtros funcionen correctamente
            let pastEvents = previousEvents(eventList, currentDate)
            function executeFilters() {
                let firstStep = filterByName(pastEvents, search.value);
                let secondStep = categoryFilter(firstStep);
                createEventCards(secondStep, cardsContainer);
            }
            checkboxesCreation(pastEvents, checksContainer);
            createEventCards(pastEvents, cardsContainer)
        }).catch(error => console.log(error));
};
obtainData();


import { checkboxesCreation, filterByName, categoryFilter, createEventCards } from "./functions.js";
const search = document.querySelector('#search');
const cardsContainer = document.getElementById('cards_box');
async function filterCards() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events
            //Nota, se declararon las siguientes variables y funciones aquí ya que después de varias pruebas esta fué la única manera de hacer que la creación de tarjetas y ejecución de filtros funcionen correctamente 
            function executeFilters() {
                let firstStep = filterByName(eventList, search.value);
                let secondStep = categoryFilter(firstStep);
                createEventCards(secondStep, cardsContainer);
            };
            search.addEventListener('input', executeFilters)
            checksContainer.addEventListener('change', executeFilters)
            checkboxesCreation(eventList, checksContainer);
            createEventCards(eventList, cardsContainer)
        })
        .catch(error => console.log(error));
};
filterCards();



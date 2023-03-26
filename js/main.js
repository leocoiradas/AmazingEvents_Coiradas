import { checkboxesCreation, executeFilters } from "./functions.js";
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            currentDate = data.currentDate
            checkboxesCreation(eventList, checksContainer);
            search.addEventListener('input', executeFilters)
            checksContainer.addEventListener('change', executeFilters)
            executeFilters();
        }).catch(error => console.log(error));
};
obtainData();


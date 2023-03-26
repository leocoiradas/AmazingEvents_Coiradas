import { previousEvents, checkboxesCreation, executeFiltersPast } from "./functions.js";
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            currentDate = data.currentDate
            previousEvents(eventList);
            checkboxesCreation(eventList, checksContainer);
            search.addEventListener('input', executeFiltersPast);
            checksContainer.addEventListener('change', executeFiltersPast);
            executeFiltersPast();
        }).catch(error => console.log(error));
};
obtainData();


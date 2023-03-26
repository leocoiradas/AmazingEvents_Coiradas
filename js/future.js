import { upcomingEvents, checkboxesCreation, executeFiltersFuture } from "./functions.js";
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            currentDate = data.currentDate
            upcomingEvents(eventList);
            checkboxesCreation(eventList, checksContainer);
            search.addEventListener('input', executeFiltersFuture);
            checksContainer.addEventListener('change', executeFiltersFuture);
            executeFiltersFuture();
        }).catch(error => console.log(error));
};
obtainData();


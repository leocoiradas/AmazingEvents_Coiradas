import{previousEvents, checkboxesCreation, executeFiltersPast} from "./functions.js";
previousEvents(data.events);
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFiltersPast);
checksContainer.addEventListener('change', executeFiltersPast);
executeFiltersPast();

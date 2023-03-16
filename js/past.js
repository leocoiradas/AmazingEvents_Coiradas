import{pastDates, checkboxesCreation, executeFiltersPast} from "./functions.js";
pastDates(data.events);
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFiltersPast);
checksContainer.addEventListener('change', executeFiltersPast);
executeFiltersPast();

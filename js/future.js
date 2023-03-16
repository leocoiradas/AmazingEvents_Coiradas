import{futureDates, checkboxesCreation, executeFiltersFuture} from "./functions.js";
futureDates(data.events);
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFiltersFuture);
checksContainer.addEventListener('change', executeFiltersFuture);
executeFiltersFuture();

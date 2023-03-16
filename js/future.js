import{upcomingEvents, checkboxesCreation, executeFiltersFuture} from "./functions.js";
upcomingEvents(data.events);
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFiltersFuture);
checksContainer.addEventListener('change', executeFiltersFuture);
executeFiltersFuture();

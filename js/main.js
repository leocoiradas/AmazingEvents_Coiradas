import {checkboxesCreation, executeFilters} from "./functions.js";
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFilters)
checksContainer.addEventListener('change', executeFilters)
executeFilters(data.events);

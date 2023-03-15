import{futureDates, checkboxesCreation, executeFilters} from "./functions.js";
//const cards = document.getElementById("cards_box");
let futureArray = futureDates(data.events);
console.log(futureArray);
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFilters);
checksContainer.addEventListener('change', executeFilters);
executeFilters(futureArray);

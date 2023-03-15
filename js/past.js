import{pastDates, checkboxesCreation, executeFilters} from "./functions.js";
//const cards = document.getElementById("cards_box");
let pastArray = pastDates(data.events);
console.log(pastArray);
checkboxesCreation(data.events, checksContainer);
search.addEventListener('input', executeFilters);
checksContainer.addEventListener('change', executeFilters);
executeFilters(pastArray);

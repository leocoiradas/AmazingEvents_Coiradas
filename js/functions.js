//Toma un arreglo el cual filtra los elementos en base a si su fecha de realización es menor que la fecha actual 
function previousEvents(eventsArray, currentDate) {
    let pastEvents = [];
    pastEvents = eventsArray.filter(event => Date.parse(event.date) < Date.parse(currentDate));
    return pastEvents;
}
//Toma un arreglo y filtra los objetos pusheando en el array aquellos que no han sido realizados aún
function upcomingEvents(eventsArray, currentDate) {
    let futureEvents = [];
    futureEvents = eventsArray.filter(event => Date.parse(event.date) > Date.parse(currentDate));
    return futureEvents;
}
//Toma un array el cual copia en un array las categorias de los elementos mediante el map, luego se utiliza el método Set para eliminar 
//los duplicados en caso de que los haya, y se generan los checkboxes con las categorías correspondientes a los objetos del arreglo original
function checkboxesCreation(array, categoriesContainer) {
    let eventCategories = array.map(card => card.category);
    let categoriesAuxi = new Set(eventCategories)
    let categoryOfEvents = Array.from(categoriesAuxi);
    let categories = '';
    categoryOfEvents.forEach(category => {
        categories += `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" role="switch" id="${category}" value="${category}">
                        <label class="form-check-label" for="${category}">${category}</label>
                    </div>`
    })
    categoriesContainer.innerHTML = categories;
};
//crea una card por cada evento existente y si la longitud del array es 0, se imprime un mensaje indicando que no se encontró lo buscado
function createEventCards(array, container) {
    if (array.length == 0) {
        container.innerHTML = `<h4 class="fw-light text-center text-light mt-4">Sorry, we couldn't find what you're looking for. <i class="bi bi-emoji-frown-fill"></i></h4>`
        return
    }
    let checkedCards = '';
    array.forEach(activity => {
        checkedCards += `<div class="card m-2" style="width: 24rem;">
        <div class="image_container">
            <img src="${activity.image}" class="card-img-top" alt="event_image">
            </div>
            <div class="card-body">
            <h5 class="card-title">${activity.name}</h5>
            <p class="card-text my-2">${activity.date}</p>
            <p class="card-text text-center card-description"><i>${activity.description}</i></p>
            <a href="../html/details.html?id=${activity._id}" class="btn btn-primary">More Details</a>
        </div>
    </div>`;
    })
    container.innerHTML = checkedCards;
}
//Funcion utilizada para filtrar por texto en la barra de busqueda y para que muestre aquellas tarjetas cuyo nombre coincida con los caracteres ingresados en el input
function filterByName(array, text) {
    let arrAuxi = Array.from(array)
    let namesFiltered = arrAuxi.filter(elemento => elemento.name.toLowerCase().includes(text.toLowerCase()));
    console.log(namesFiltered);
    return namesFiltered;
};

function categoryFilter(arr) {
    //console.log(arr);
    let checkCategories = document.querySelectorAll("input[type='checkbox']")
    //console.log(checkCategories);
    let arrayCategories = Array.from(checkCategories);
    console.log(arrayCategories);
    let arrayCategoriesChecked = arrayCategories.filter(check => check.checked);
    console.log(arrayCategoriesChecked);
    let valuesOfCategoriesChecked = arrayCategoriesChecked.map(checkChecked => checkChecked.value);
    console.log(valuesOfCategoriesChecked);
    //let categoriesFiltered = arr.filter(element=>element.category.toLowerCase().includes(valuesOfCategoriesChecked.toLowerCase()))
    let categoriesFiltered = arr.filter(element => valuesOfCategoriesChecked.includes(element.category));
    console.log(categoriesFiltered);
    if (arrayCategoriesChecked.length > 0) {
        return categoriesFiltered;
    } else {
        return arr;
    }
}


//Las siguientes funciones sirven para aplicar todos los filtros a la vez
//Nota: se crearon multiples funciones similares debido a que cuando se pasa un array como parametro a executeFilters el filtro falla en la linea 64, dejando el array.filter como una función inexistente
/*function executeFilters(){
    let cardsContainer = document.getElementById('cards_box');
    let search= document.getElementById('search');
    let firstStep= filterByName(eventList, search.value);
    let secondStep= categoryFilter(firstStep);
    createEventCards(secondStep, cardsContainer);
}
function executeFiltersPast(array){
    let cardsContainer = document.getElementById('cards_box');
    let search= document.getElementById('search');
    let firstStep= filterByName(previousEvents(array), search.value);
    let secondStep= categoryFilter(firstStep);
    createEventCards(secondStep, cardsContainer);
}*/

/*function executeFilters() {
    let firstStep = filterByName(eventList, search.value);
    let secondStep = categoryFilter(firstStep);
    createEventCards(secondStep, cardsContainer);
}*/

export { previousEvents, upcomingEvents, checkboxesCreation, categoryFilter, filterByName, createEventCards };

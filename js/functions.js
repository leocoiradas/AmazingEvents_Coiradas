//Toma un arreglo el cual filtra los elementos en base a si su fecha de realización es menor que la fecha actual 
function pastDates(array){
    let pastEvents = [];
    pastEvents = array.filter(event=>Date.parse(event.date) < Date.parse(data.currentDate));
    return pastEvents;
}
//Toma un arreglo y filtra los objetos pusheando en el array aquellos que no han sido realizados aún
function futureDates(array){
    let futureEvents=[];
    futureEvents= array.filter(event=> Date.parse(event.date) > Date.parse(data.currentDate));
    return futureEvents;
}
//Toma un array el cual copia en un array las categorias de los elementos mediante el map, luego se utiliza el método Set para eliminar 
//los duplicados en caso de que los haya, y se generan los checkboxes con las categorías correspondientes a los objetos del arreglo original
function checkboxesCreation(array, categoriesContainer){
    let eventCategories = array.map(card=> card.category);
    let categoryOfEvents = Array.from(new Set(eventCategories));
    let categories = '';
    categoryOfEvents.forEach(category=>{
        categories+= `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                        <label class="form-check-label" for="${category}">${category}</label>
                    </div>`
    })
    categoriesContainer.innerHTML=categories;
};
//crea una card por cada evento existente y si la longitud del array es 0, se imprime un mensaje indicando que no se encontró lo buscado
function createEventCards(array, container){
    //console.log(array)
    if (array.length == 0){
        container.innerHTML= `<h4 class="fw-light text-center text-light mt-4">Sorry, we couldn't find what you're looking for. <i class="bi bi-emoji-frown-fill"></i></h4>`
        return
    }
    let checkedCards = '';
    array.forEach(activity =>{
        checkedCards += `<div class="card m-2" style="width: 24rem;">
        <div class="image_container">
            <img src="${activity.image}" class="card-img-top" alt="event_image">
            </div>
            <div class="card-body">
            <h5 class="card-title">${activity.name}</h5>
            <p class="card-text my-2">${activity.date}</p>
            <p class="card-text text-center card-description"><i>${activity.description}</i></p>
            <a href="./details.html" class="btn btn-primary">More Details</a>
        </div>
    </div>`;
    })
    container.innerHTML= checkedCards;
}
//es una función que filtra los elementos en un array en base al texto ingresado, el cual pregunta si ese texto forma parte del nombre de algún elemento en el array
function filterByName(arr ,text){
    console.log(arr);
    console.log(text);
    let categoriesFiltered = arr.filter(elemento=>elemento.name.toLowerCase().includes(text.toLowerCase()));
    console.log(categoriesFiltered)
    return categoriesFiltered;
};
function categoryFilter(array){
    let checkCategories= document.querySelectorAll("input[type='checkbox']");
    let arrayCategories = Array.from(checkCategories);
    let arrayCategoriesChecked = arrayCategories.filter(check => check.checked);
    let valuesOfCategoriesChecked = arrayCategoriesChecked.map(checkChecked => checkChecked.value.toLowerCase());
    let categoriesFiltered = array.filter(elemento=> valuesOfCategoriesChecked.includes(elemento.category.toLowerCase()));
    if (arrayCategoriesChecked.length > 0){
        return categoriesFiltered;
    }
    return array;
}
function executeFilters(array){
    let cardsContainer = document.getElementById('cards_box');
    let search= document.getElementById('search');
    let firstStep= filterByName(array, search.value);
    let secondStep= categoryFilter(firstStep);
    createEventCards(secondStep, cardsContainer);
}
export {pastDates, futureDates,checkboxesCreation ,categoryFilter,filterByName, createEventCards, executeFilters};

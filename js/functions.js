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

//Toma un arreglo que por medio del for, crea una card por cada elemento del array
function createCards (arr, container){
    let fragment = document.createDocumentFragment();
    for(let i=0; i<arr.length; i++) {
        let cardBox = document.createElement("div");
        cardBox.innerHTML = `<div class="card m-2" style="width: 24rem;">
        <div class="image_container">
            <img src="${arr[i].image}" class="card-img-top" alt="event_image">
            </div>
            <div class="card-body">
            <h5 class="card-title">${arr[i].name}</h5>
            <p class="card-text my-2">${arr[i].date}</p>
            <p class="card-text text-center card-description"><i>${arr[i].description}</i></p>
            <a href="./details.html" class="btn btn-primary">More Details</a>
        </div>
    </div>`;
        fragment.appendChild(cardBox);
    };
    container.appendChild(fragment);
};

//Toma un array el cual copia en un array las categorias de los elementos mediante el map, luego se utiliza el método Set para eliminar 
//los duplicados en caso de que los haya, y se generan los checkboxes con las categorías correspondientes a los objetos del arreglo original
function checkboxesCreation(array){
    let eventCategories = array.map(card=> card.category);
    //console.log(eventCategories);
    let categoryOfEvents = Array.from(new Set(eventCategories));
    let categories = '';
    categoryOfEvents.forEach(category=>{
        categories+= `
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                        <label class="form-check-label" for="${category}">${category}</label>
                    </div>`
    })
    filterAndSearch.innerHTML=categories;

};



console.log(checkboxesCreation(data.events))
export {pastDates, futureDates, createCards, checkboxesCreation};
//import { previousEvents } from "../js/functions.js";
const allData = document.querySelector('#tbody1');
const pastData = document.querySelector('.table2')
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            currentDate = data.currentDate
            //console.log(data.events);
            //console.log(biggestCapacity(data.events));
            // console.log(biggestAssistance(data.events));
            //console.log(lowestAssistance(data.events));
            // console.log(categories(data.events));

            //console.log(pastEventsData(previousEvents(data.events)));
            //console.log(data);
            //console.log(previousEvents(data.events));
            insertDataOfPastEvents(pastEventsData(previousEvents(data.events)), pastData)
            drawTableOfAllEvents(allData)
            //console.log((previousEvents(data.events)));

        }).catch(error => console.log(error));
};
obtainData();
//El siguiente par de funciones toma un array como parametro y por el metodo reduce va recorriendo los elementos del array comparando si la asistencia es mayor o menor al anterior.
//Devuelve el nombre del evento con la mayor asistencia
function biggestAssistance(array) {
    let moreAssistance = ''
    let arrAuxi = []
    let arrAssistance = []
    let arrEstimate = []
    array.forEach(element => {
        if (element.assistance === undefined) {
            arrEstimate.push(element)
        } else {
            arrAssistance.push(element)
        }
    });
    console.log(arrEstimate);
    console.log(arrAssistance);
    let assistanceAuxi = arrAssistance.reduce((a, b) => (a.assistance * a.capacity) / 100 < (b.assistance * b.capacity) / 100 ? a : b)
    let estimateAuxi = arrEstimate.reduce((a, b) => (a.estimate * a.capacity) / 100 < (b.estimate * b.capacity) / 100 ? a : b)
    arrAuxi.push(assistanceAuxi, estimateAuxi)
    console.log(arrAuxi);
    moreAssistance = arrAuxi.reduce((a, b) => (a.assistance * a.capacity) / 100 < (b.estimate * b.capacity) / 100 ? a : b).name
    return moreAssistance;
};
//Devuelve el nombre del evento con la menor asistencia
function lowestAssistance(array) {
    let lessAssistance = ''
    let arrAuxi = []
    let arrAssistance = []
    let arrEstimate = []
    array.forEach(element => {
        if (element.assistance === undefined) {
            arrEstimate.push(element)
        } else {
            arrAssistance.push(element)
        }
    })
    let assistanceAuxi = arrAssistance.reduce((a, b) => (a.assistance * a.capacity) / 100 < (b.assistance * b.capacity) / 100 ? a : b)
    let estimateAuxi = arrEstimate.reduce((a, b) => (a.estimate * a.capacity) / 100 < (b.estimate * b.capacity) / 100 ? a : b)
    arrAuxi.push(assistanceAuxi, estimateAuxi)
    lessAssistance = arrAuxi.reduce((a, b) => (a.assistance * a.capacity) / 100 < (b.estimate * b.capacity) / 100 ? a : b).name
    return lessAssistance;
};
//Toma un array y devuelve el evento con mayor capacidad
function biggestCapacity(arr) {
    let eventCapacity = arr.reduce((a, b) => a.capacity > b.capacity ? a : b).name;
    return eventCapacity;
}

function drawTableOfAllEvents(container) {
    let allEventsArray = []
    let lowestAssistanceEvent = lowestAssistance(eventList)
    let eventWithMoreAttendance = biggestAssistance(eventList)
    let eventWithMoreCapacity = biggestCapacity(eventList)
    allEventsArray.push(lowestAssistanceEvent, eventWithMoreAttendance, eventWithMoreCapacity)
    let tr = document.createElement('tr')
    allEventsArray.forEach(element => {
        let td = document.createElement('td')
        td.innerText = element
        tr.appendChild(td)
        container.appendChild(tr)
    })


}
//A continuación se muestran las funciones para la tabla de eventos futuros



//A continuación se muestran las funciones para la tabla de eventos pasados
//Nota: para los eventos pasados, crear 3 funciones:
// 1 que me retorne un array con las categorias
//Otro que segun la categoria, vaya acumulando las ganancias. ej: comida= 575757575 
//El ultimo contiene los porcentajes de categoria de cada categoria
function categories(array) {
    let arrCategories = array.map(element => element.category)
    let arrayCategories = Array.from(new Set(arrCategories))
    return arrayCategories
}

function previousEvents(array) {
    let pastEvents = [];
    pastEvents = array.filter(event => Date.parse(event.date) < Date.parse(currentDate));
    return pastEvents;
}


function pastEventsData(array) {
    let categoriesAuxi = previousEvents(array)
    //console.log(categoriesAuxi);
    let categoriesOfPastEvents = categories(categoriesAuxi)
    //console.log(categoriesOfPastEvents);
    let reveniewArray = []
    for (let i = 0; i < categoriesOfPastEvents.length; i++) {
        let collectionOfCategory = []
        let eventData = {}
        collectionOfCategory = array.filter(element => element.category == categoriesOfPastEvents[i])
        //console.log(collectionOfCategory);
        eventData.category = categoriesOfPastEvents[i]
        eventData.revenue = collectionOfCategory.reduce((a, b) => a + (b.price * b.assistance), 0)
        //console.log(eventData.revenue);
        let totalAssistance = collectionOfCategory.reduce((a, b) => a + b.assistance, 0)
        let totalCapacity = collectionOfCategory.reduce((a, b) => a + b.capacity, 0)
        eventData.percentage = Math.round((totalAssistance / totalCapacity) * 100) + '%'
        reveniewArray.push(eventData)

    }
    //console.log(reveniewArray);
    return reveniewArray
}


function insertDataOfPastEvents(array, container) {
    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement('tr')
        for (property in array[i]) {
            let td = document.createElement('td')
            td.innerText = array[i][property]
            tr.appendChild(td)
        }
        container.appendChild(tr)
    }
}


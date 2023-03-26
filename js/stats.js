//import { previousEvents } from "../js/functions.js";
const allData = document.querySelector('.table1');
const pastData = document.querySelector('.table3')
const upcomingData = document.querySelector('.table2')
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            currentDate = data.currentDate
            //insertDataOfPastEvents(pastEventsData(previousEvents(data.events)), pastData)
            //drawTableOfAllEvents(allData)
            //console.log(upcomingEventsData(upcomingEvents(eventList)));
            //console.log(upcomingEvents(eventList));
            drawStats(eventList, allData, pastData, upcomingData)

        }).catch(error => console.log(error));
};
obtainData();
function drawStats(array, container1, container2, container3) {
    drawTableOfAllEvents(container1)
    pastEventsStats(array, container2)
    futureEventsStats(array, container3)
}

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
    let assistanceAuxi = arrAssistance.reduce((a, b) => (a.assistance * a.capacity) / 100 > (b.assistance * b.capacity) / 100 ? a : b)
    let estimateAuxi = arrEstimate.reduce((a, b) => (a.estimate * a.capacity) / 100 > (b.estimate * b.capacity) / 100 ? a : b)
    arrAuxi.push(assistanceAuxi, estimateAuxi)
    moreAssistance = arrAuxi.reduce((a, b) => (a.assistance * a.capacity) / 100 > (b.estimate * b.capacity) / 100 ? a : b).name
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
    allEventsArray.push(eventWithMoreAttendance, lowestAssistanceEvent, eventWithMoreCapacity)
    let tr = document.createElement('tr')
    allEventsArray.forEach(element => {
        let td = document.createElement('td')
        td.innerText = element
        tr.appendChild(td)
    })
    container.appendChild(tr)
}
//A continuación se muestran las funciones para la tabla de eventos futuros
function upcomingEvents(array) {
    let futureEvents = [];
    futureEvents = array.filter(event => Date.parse(event.date) > Date.parse(currentDate));
    return futureEvents;
}
function createFutureData(array){
    let categoriesAuxi = upcomingEvents(array)
    console.log(categoriesAuxi);
    let categoriesOfEvents = categories(categoriesAuxi)
    let reveniewArray = []
    for (let i = 0; i < categoriesOfEvents.length; i++) {
        let collectionOfCategory = []
        let eventData = {}
        collectionOfCategory = array.filter(element => element.category == categoriesOfEvents[i])
        eventData.category = categoriesOfEvents[i]
        eventData.revenue = collectionOfCategory.reduce((a, b) => a + (b.price * b.estimate), 0)
        let totalAssistance = collectionOfCategory.reduce((a, b) => a + b.estimate, 0)
        let totalCapacity = collectionOfCategory.reduce((a, b) => a + b.capacity, 0)
        eventData.percentage = Math.round((totalAssistance / totalCapacity) * 100) + '%'
        reveniewArray.push(eventData)
    }
    return reveniewArray
}
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
//Nota: editar la siguiente funcion, agregarle un condicional para que funcione para eventos pasados y futuros: si es assistance, se ejecuta lo actual, si es estimate, ejecutar otras funciones con estimate
function createPastData(array) {
    let categoriesAuxi = previousEvents(array)
    let categoriesOfEvents = categories(categoriesAuxi)
    let reveniewArray = []
    for (let i = 0; i < categoriesOfEvents.length; i++) {
        let collectionOfCategory = []
        let eventData = {}
        collectionOfCategory = array.filter(element => element.category == categoriesOfEvents[i])
        eventData.category = categoriesOfEvents[i]
        eventData.revenue = collectionOfCategory.reduce((a, b) => a + (b.price * b.assistance), 0)
        let totalAssistance = collectionOfCategory.reduce((a, b) => a + b.assistance, 0)
        let totalCapacity = collectionOfCategory.reduce((a, b) => a + b.capacity, 0)
        eventData.percentage = Math.round((totalAssistance / totalCapacity) * 100) + '%'
        reveniewArray.push(eventData)
    }
return reveniewArray
}
function insertDataInTable(array, container) {
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

function pastEventsStats(array, container) {
    let pastEventsData=previousEvents(array)
    let pastData= createPastData(pastEventsData)
    insertDataInTable(pastData, container)
}
function futureEventsStats(array, container) {
    let futureEventsData= upcomingEvents(array)
    let futureData = createFutureData(futureEventsData)
    insertDataInTable(futureData, container)
}


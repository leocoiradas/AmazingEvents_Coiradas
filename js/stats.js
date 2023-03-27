//import { previousEvents } from "../js/functions.js";
const allData = document.querySelector('.table1');
const pastData = document.querySelector('.table3')
const upcomingData = document.querySelector('.table2')
async function obtainData() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events
            console.log(eventList);
            currentDate = data.currentDate
            drawStats(eventList, allData, pastData, upcomingData)

        }).catch(error => console.log(error));
};
obtainData();
//Función que unifica la creación de los datos en cada tabla
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
//Dibuja los datos correspondientes de la tabla de todos los eventos (tabla 1)
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
//Recibe un array y va filtrando los eventos por categoria. Devuelve un array de objetos donde cada objeto representa una categoría en el cual tiene como parametros: nombre de la categoria, ganancia total de dicha categoria, porcentaje de asistencia por cada categoria
function createFutureData(array){
    let categoriesAuxi = upcomingEvents(array)
    console.log(categoriesAuxi);
    let categoriesOfEvents = categories(categoriesAuxi)
    let reveniewArray = []
    for (let i = 0; i < categoriesOfEvents.length; i++) {
        let collectionOfCategory = []
        let eventData = {}
        console.log(array);
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
//La sig. función recibe un array de eventos y devuelve otro array con las categorías de los eventos, usando el metodo Set se evitan categorias repetidas
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
//Recibe un array y va filtrando los eventos por categoria. Devuelve un array de objetos donde cada objeto representa una categoría en el cual tiene como parametros: nombre de la categoria, ganancia total de dicha categoria, porcentaje de asistencia por cada categoria
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
//recibe un array y contenedor. Va creando una tabla con los datos dentro del array
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
//Las siguientes funciones reciben el array de eventos del archivo JSON. Por medio de las funciones previous y upcoming se crean los arrays con eventos pasados y futuros, luego se crean los arrays con los datos a ingresar en la tabla (createData) y se insertan en la misma por medio de la función insertDataInTable
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


const allData= document.querySelector('#tbody1');
async function obtainData(){
    await fetch("../data/amazing.json")
    .then (response => response.json())
    .then(data=>{
        eventList= data.events 
        console.log(data.events);
        console.log(biggestCapacity(data.events));
        console.log(biggestAssistance(data.events));
        console.log(lowestAssistance(data.events));
        


    }).catch(error=>console.log(error));
};
obtainData();
//El siguiente par de funciones toma un array como parametro y por el metodo reduce va recorriendo los elementos del array comparando si la asistencia es mayor o menor al anterior.
//Devuelve el nombre del evento con la mayor asistencia
function biggestAssistance(array){
    let moreAssistance=''
    let arrAuxi=[]
    let arrAssistance=[]
    let arrEstimate=[]
    array.forEach(element => {
        if(element.assistance === undefined){
            arrEstimate.push(element)
        }else{
            arrAssistance.push(element)
        }
    });
    console.log(arrEstimate);
    console.log(arrAssistance);
    let assistanceAuxi= arrAssistance.reduce((a,b) => (a.assistance*100)/a.capacity > (b.assistance*100)/b.capacity ? a:b)
    let estimateAuxi= arrEstimate.reduce((a,b) => (a.estimate*100)/a.capacity > (b.estimate*100)/b.capacity ? a:b)
    arrAuxi.push(assistanceAuxi,estimateAuxi)
    console.log(arrAuxi);
    moreAssistance = arrAuxi.reduce((a,b) => (a.assistance*100)/a.capacity>(b.estimate*100)/b.capacity ? a:b).name
    return moreAssistance;





    /*let estimateAuxi = array.reduce((a,b) => (a.estimate*100)/a.capacity > (b.estimate*100)/b.capacity ? a:b)
    console.log(estimateAuxi)
    let assistanceAuxi = array.reduce((a,b) => (a.assistance*100)/a.capacity > (b.assistance*100)/b.capacity ? a:b)
    arrAuxi.push(estimateAuxi, assistanceAuxi)
    console.log(arrAuxi)
    if(assistanceAuxi>estimateAuxi){
        moreAssistance=assistanceAuxi
    }else{
        moreAssistance=estimateAuxi
    }
    return moreAssistance;*/
};
//Devuelve el nombre del evento con la menor asistencia
function lowestAssistance(array){
    let lessAssistance=''
    let arrAuxi=[]
    let arrAssistance=[]
    let arrEstimate=[]
    array.forEach(element => {
        if(element.assistance === undefined){
            arrEstimate.push(element)
        }else{
            arrAssistance.push(element)
        }
    });
    console.log(arrEstimate);
    console.log(arrAssistance);
    let assistanceAuxi= arrAssistance.reduce((a,b) => (a.assistance*100)/a.capacity < (b.assistance*100)/b.capacity ? a:b)
    let estimateAuxi= arrEstimate.reduce((a,b) => (a.estimate*100)/a.capacity < (b.estimate*100)/b.capacity ? a:b)
    arrAuxi.push(assistanceAuxi,estimateAuxi)
    console.log(arrAuxi);
    lessAssistance = arrAuxi.reduce((a,b) => (a.assistance*100)/a.capacity<(b.estimate*100)/b.capacity ? a:b).name
    return lessAssistance;


    /*let lessAssistance = array.reduce((a,b) => (a.assistance*100)/a.capacity > (b.assistance*100)/b.capacity ? a:b).name
    return lessAssistance;*/
};
//Toma un array y devuelve el evento con mayor capacidad
function biggestCapacity(arr){
    let eventCapacity = arr.reduce((a,b) => a.capacity>b.capacity ? a:b).name;
    return eventCapacity;
}
//A continuación se muestran las funciones para la tabla de eventos futuros



//A continuación se muestran las funciones para la tabla de eventos pasados
//Nota: para los eventos pasados, crear 3 funciones:
// 1 que me retorne un array con las categorias
//Otro que segun la categoria, vaya acumulando las ganancias. ej: comida= 575757575 
//El ultimo contiene los porcentajes de categoria de cada categoria
function categories(array){
    let arrayCategories=[]
    array.forEach(element=>arrayCategories.push(element.category))
    return arrayCategories
}

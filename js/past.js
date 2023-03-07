const cards = document.getElementById("cards_box");
let tarjetas = '';
let fechaActual = new Date(data.currentDate);
for (i = 0; i < data.events.length; i++) {
    const fechaEvent = new Date(data.events[i].date);
    if(fechaEvent<fechaActual){
        tarjetas += `<div class="card m-2" style="width: 24rem;">
                        <div class="image_container">
                            <img src="${data.events[i].image}" class="card-img-top" alt="event_image">
                            </div>
                            <div class="card-body">
                            <h5 class="card-title">${data.events[i].name}</h5>
                            <p class="card-text my-2">${data.events[i].date}</p>
                            <p class="card-text text-center card-description"><i>${data.events[i].description}</i></p>
                            <p class="card-text"><b>Category:</b> ${data.events[i].category}</p>
                            <p class="card-text"><b>Place:</b> ${data.events[i].place}</p>
                            <p class="card-text"><b>Capacity:</b> ${data.events[i].capacity}</p>
                            <p class="card-text"><b>Assistance:</b> ${data.events[i].assistance}</p>
                            <p class="card-text"><b>Price:</b> $${data.events[i].price}</p>
                            <a href="./details.html" class="btn btn-primary">More Details</a>
                        </div>
                </div>`
    }
    
}
cards.innerHTML = tarjetas;
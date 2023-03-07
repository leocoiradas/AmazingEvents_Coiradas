const cards = document.getElementById("card_container");
let tarjetas = '';
//let fechaActual = new Date(data.currentDate);

for (i = 0; i < data.events.length; i++) {
    tarjetas += `<div class="card" style="width: 18rem;">
                    <img src="${data.events[i].image}" class="card-img-top" alt="event_image" height="200px">
                    <div class="card-body">
                        <h5 class="card-title">${data.events[i].name}</h5>
                        <p class="card-text mt-1">${data.events[i].date}</p>
                        <p class="card-text text-center"><i>${data.events[i].description}</i></p>
                        <p class="card-text"><b>Category:</b> ${data.events[i].category}</p>
                        <p class="card-text"><b>Place:</b> ${data.events[i].place}</p>
                        <p class="card-text"><b>Capacity:</b> ${data.events[i].capacity}</p>
                        <p class="card-text"><b>Assistance:</b> ${data.events[i].assistance}</p>
                        <p class="card-text"><b>Price:</b> $${data.events[i].price}</p>
                        <a href="./html/details.html" class="btn btn-primary">More Details</a>
                    </div>
                </div>`
}
cards.innerHTML = tarjetas;

/*<div class="card" style="width: 18rem;">
  <img src="data.events[i].image" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.events[i].name}</h5>
    <p class="card-text">${data.events[i].date}</p>
    <p class="card-text">${data.events[i].description}</p>
    <p class="card-text">`Category: ${data.events[i].category}`</p>
    <p class="card-text">`Place: ${data.events[i].place}`</p>
    <p class="card-text">`Capacity: ${data.events[i].capacity}`</p>
    <p class="card-text">`Assistance: ${data.events[i].assistance}`</p>
    <p class="card-text">`Category: ${data.events[i].category}`</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>*/
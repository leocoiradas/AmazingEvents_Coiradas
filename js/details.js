const detailsCardContainer = document.querySelector(".detailsCard");
async function dynamicCards() {
    fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            eventList = data.events;
            const queryString = location.search;
            const params = new URLSearchParams(queryString);
            const id = params.get('id');
            const detailsCard = eventList.find(card => card._id == id);
            createCardById(detailsCard,detailsCardContainer);
        });
};
dynamicCards();
//La siguiente función es utilizada para la creación de tarjetas dinámicas
function createCardById(card, container) {
    container.innerHTML = `
            <div class="container-fluid d-flex flex-wrap p-3 m-5 card_container">
                <div class="details-card gap-1 m-2">
                    <img src="${card.image}"  alt="event">
                </div>
                <div class="details-card m-2 p-3">
                    <div class="card-body d-flex flex-column align-items-start">
                        <h5 class="card-title mb-2 text-center"><b>${card.name}</b></h5>
                        <p class="card-text my-2 card-description"><i>${card.description}</i></p>
                        <p class="card-text my-2 text-center"><b>Date: </b>${card.date}</p>
                        <p class="card-text my-2"><b>Category: </b>${card.category}</p>
                        <p class="card-text my-2"><b>Place: </b>${card.place}</p>
                        <p class="card-text my-2"><b>Capacity: </b>${card.capacity} people</p>
                        <p class="card-text my-2">${card.assistance ? '<b>Assistance: </b>' + card.assistance:'<b>Estimate: </b>' + card.estimate} people</p>
                        <p class="card-text my-2"><b>Price: </b>$${card.price}</p>
                        </div>
                </div>
            </div>`;
}


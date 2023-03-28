const detailsCardContainer = document.querySelector(".detailsCard");
async function dynamicCards() {
    fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            const eventList = data.events;
            const queryString = location.search;
            const params = new URLSearchParams(queryString);
            const id = params.get('id');
            const detailsCard = eventList.find(card => card._id == id);
            createCardById(detailsCard,detailsCardContainer);
        });
};
dynamicCards();
//La siguiente función se utiliza para alternar en las tarjetas que tengan las propiedades assistance o estimate
//Recibe un elemento y pregunta si su propiedad es de tipo y valor undefined, caso positivo imprime un string y la propiedad Estimate. caso contrario hace lo mismo pero con assistance
function assistanceOrEstimate(element) {
    if (element.assistance === undefined) {
        return '<b>Estimate: </b>' + element.estimate;
    } else {
        return '<b>Assistance: </b>' + element.assistance;
    }
};
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
                        <p class="card-text my-2">${assistanceOrEstimate(card)} people</p>
                        <p class="card-text my-2"><b>Price: </b>$${card.price}</p>
                        </div>
                </div>
            </div>`;
}


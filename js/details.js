const queryString= location.search;
const params= new URLSearchParams(queryString);
const id= params.get('id');
const detailsCard= data.events.find(card=> card._id == id);
const detailsCardContainer= document.querySelector(".detailsCard");
function assistanceOrEstimate(element){
    if (element.assistance === undefined){
        return '<b>Estimate: </b>'+element.estimate;
    }else{
        return '<b>Assistance: </b>'+element.assistance;
    }
}
detailsCardContainer.innerHTML = `
            <div class="container-fluid d-flex flex-wrap p-3 m-5 card_container">
                <div class="details-card gap-1 m-2">
                    <img src="${detailsCard.image}"  alt="event">
                </div>
                <div class="details-card m-2 p-3">
                    <div class="card-body d-flex flex-column align-items-start">
                        <h5 class="card-title mb-2 text-center"><b>${detailsCard.name}</b></h5>
                        <p class="card-text my-2 card-description"><i>${detailsCard.description}</i></p>
                        <p class="card-text my-2 text-center"><b>Date: </b>${detailsCard.date}</p>
                        <p class="card-text my-2"><b>Category: </b>${detailsCard.category}</p>
                        <p class="card-text my-2"><b>Place: </b>${detailsCard.place}</p>
                        <p class="card-text my-2"><b>Capacity: </b>${detailsCard.capacity} people</p>
                        <p class="card-text my-2">${assistanceOrEstimate(detailsCard)} people</p>
                        <p class="card-text my-2"><b>Price: </b>$${detailsCard.price}</p>
                        </div>
                </div>
            </div>`
            
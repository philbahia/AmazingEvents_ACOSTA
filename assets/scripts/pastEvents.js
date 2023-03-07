import data from "./amazing.js";

//recupero fecha
const date_today = data.currentDate;
console.log(date_today);

//desestructura object data
let { events } = data;
//creamos array de objetos events
console.log("array eventos");
console.log(events);

let pastEvents = events.filter(ep => ep.date < date_today);

console.log("array eventos filtrado");
console.table(pastEvents);


//**************************

const contcard = document.querySelector("#cardMain");
const template = document.querySelector('#card-tpl').content;
const fragment = document.createDocumentFragment();

pastEvents.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.card-price').textContent = "$ " + event.price;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

})

contcard.appendChild(fragment);




import data from "./amazing.js"


const date_today = data.currentDate;
console.log(date_today);

//desestructura object data
let { events } = data;
//creamos array de objetos events
console.log("array eventos");
console.log(events);

let homeEvents = events.filter(ep => ep.date !== date_today);


console.log("array eventos filtrado");
console.table(homeEvents);


function removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject = {};

    for (let i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}

let category = removeDuplicates(homeEvents, "category");


//*******************************

console.log("Categorias");
console.table(category);

//category.forEach(event =>{
//  const id = "inlineCheckbox-${category._id}";

//})
// ******************************
const contcard = document.querySelector("#cardMain");
const template = document.querySelector('#card-tpl').content;
const fragment = document.createDocumentFragment();

homeEvents.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.card-price').textContent = "$ " + event.price;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

})

contcard.appendChild(fragment);





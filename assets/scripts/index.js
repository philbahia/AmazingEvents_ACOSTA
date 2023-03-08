import data from "./amazing.js"

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

const date_today = data.currentDate;
const { events } = data;

//filtrar array de objetos events

let homeEvents = events.filter(ep => ep.date !== date_today);


// *****************************************************
let category = removeDuplicates(homeEvents, "category");



// *******************************
// *******************************
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





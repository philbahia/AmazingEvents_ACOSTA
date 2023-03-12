import data from "./amazing.js"

var filtercat = "";

function valida(idchk) {
    if (idchk.checked) {
        filtercat = mapcat[3];
        console.log(filtercat);
        return true;
    } else {
        return false;
    };

}

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

const homeEvents = events.filter(ep => ep.date !== date_today);


// *****************************************************
const category = removeDuplicates(homeEvents, "category");
//console.log("Categorias");
//console.table(category);

const mapcat = category.map((categ) => (categ.category));
console.log(mapcat);
console.log("categorias");


const fcheck = document.querySelector(".check");
const pltcategory = document.querySelector("#tplcat").content;
const fragcheck = document.createDocumentFragment();
let cont = 0;

mapcat.forEach(element => {

    cont = cont + 1;

    pltcategory.querySelector('.form-check-input').value = "option" + cont;
    pltcategory.querySelector('.form-check-input').id = "chkbox" + cont;
    pltcategory.querySelector('.form-check-label').textContent = element;
    pltcategory.querySelector('.form-check-label').htmlFor = "chkbox" + cont;
    const chkclon = pltcategory.cloneNode(true);
    fragcheck.appendChild(chkclon);
});

fcheck.appendChild(fragcheck);

cont = 0;
mapcat.forEach(element => {
    cont = cont + 1;
    let idchk = "#chkbox" + cont;
    const verified = document.querySelector(idchk);



})

const checkbox = document.querySelector("#chkbox4");
checkbox.addEventListener('change', (e) => {
    e.preventDefault();
    filtercat = valida(checkbox);
});



// *******************************
//filtercat = "Race"
console.log("edede" + filtercat);
//let filterEvents = events.filter(item => item.category !== filtercat) ;
let filterEvents = events.filter(item => valida(idchk));




console.log("Filtrado");
console.table(filterEvents);

// *******************************
const contcard = document.querySelector("#cardMain");
const template = document.querySelector('#card-tpl').content;
const fragment = document.createDocumentFragment();

filterEvents.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.card-price').textContent = "$ " + event.price;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

})

contcard.appendChild(fragment);





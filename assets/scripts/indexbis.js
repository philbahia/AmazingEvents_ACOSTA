import data from "./amazing.js"

let filtercat = "";

const contcard = document.querySelector("#cardMain");
const fragment = document.createDocumentFragment();
const template = document.querySelector('#card-tpl').content;

function fillcard(arrayfill) {

    if (arrayfill.length == 0) {
        console.log("Vacia");
        arrayfill = homeEvents;
    }
    contcard.innerHTML = '';

    arrayfill.forEach(event => {
        template.querySelector('.card-img-top').src = event.image;
        template.querySelector('.card-title').textContent = event.name;
        template.querySelector('.card-text').textContent = event.description;
        template.querySelector('.card-price').textContent = "$ " + event.price;
        template.querySelector('.btndetail').href = "./assets/pages/details.html?id=" + event._id;
        //template.querySelector('.btndetail').href = `./assets/pages/details.html?id="${ event._id }`;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);

    })

    contcard.appendChild(fragment);
}


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

let date_today = data.currentDate;
let { events } = data;
const homeEvents = events.filter(ep => Date.parse(ep.date) !== Date.parse(date_today));

fillcard(homeEvents);

// *****************************************************

const category = removeDuplicates(homeEvents, "category");

console.log("Categorias sin duplicados");
console.table(category);

const mapcat = category.map((categ) => (categ.category));
mapcat.sort();

console.log(mapcat);
console.log("Lista de categorias Ordenada MAPCAT");


// construye plantilla checkbox
const fcheck = document.querySelector(".check");
const pltcategory = document.querySelector("#tplcat").content;
const fragcheck = document.createDocumentFragment();

let cont = 0;

mapcat.forEach(element => {

    cont = cont + 1;

    pltcategory.querySelector('.form-check-input').value = element;
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
    console.log("No se => " + idchk);
})

function categgroup(item) {
    console.log(`Item: ${item.category}`);
    mapcat.forEach(caty => {
        if (item.category !== mapcat[index]) {
            return false;
        }
        return true;
    });
};

// todos los input checkbox
const checkbox = document.querySelectorAll(".form-check-input");
console.log("checkbox todos");
console.log(checkbox);

const boxchk = document.querySelector(".form-check");


let mehiso = function (evento) {

    let filterchk = []
    console.log("Evento: ");
    console.log([evento]);
    //evento chkbox clickeado
    //filterchk array con chkbox clickeados
    console.log("lista filterchk Inicio : " + filterchk.length);
    console.table(filterchk);

    //genero array con chkbox clickeados
    checkbox.forEach(element => {
        console.log(element.value + ": " + element.checked);
        if (element.checked) {
            filterchk.push(element.value);
        }


    })

    console.log("lista filterchk Final: " + filterchk.length);
    console.table(filterchk);
    //ninguno seleccionado default todos
    if (filterchk.length === 0) {
        filterchk = mapcat;
    }

    //filtrado data padre por categorias seleccionadas
    let filteredHome = homeEvents.filter(element => filterchk.indexOf(element.category) > -1);

    console.table(filteredHome);
    fillcard(filteredHome);

};

// Escucho a todos los check
//checkbox todos los check
checkbox.forEach(chkbox => {
    chkbox.addEventListener("click", mehiso);
});

// 88888888888

//escucho search
const search = document.querySelector("#button-addon2");
const insearch = document.querySelector(".form-control");

insearch.addEventListener("keyup", (e) => {
    e.preventDefault();
    let word = insearch.value.toLowerCase();
    //console.log(word);
    let hetFilter = events.filter(ep => ep.name.toLowerCase().includes(word));

    fillcard(hetFilter);

});




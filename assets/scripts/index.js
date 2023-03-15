import data from "./amazing.js"


function searchChk(array) {
    let checkbox = document.querySelectorAll(".form-check-input");
    console.log("checkbox todos");
    console.log(checkbox);

    const boxchk = document.querySelector(".form-check");

    let arrchk = Array.from(checkbox);

    console.log(arrchk);
    let arrchks = arrchk.filter(chk => chk.checked)
    console.log(arrchks);

    let aarrchks = arrchks.map(chk => chk.value)
    console.log(aarrchks);
    let chksfilter = array.filter(element => aarrchks.includes(element.category));
    console.log(chksfilter);

    if (chksfilter.length == 0) {
        console.log("Vacia");
        chksfilter = homeEvents;
    }

    return chksfilter;


}


function searchInput(array, text) {

    let word = insearch.value.toLowerCase();
    let hetFilter = array.filter(ep => ep.name.toLowerCase().includes(word));
    return hetFilter;
}

//funcion crear checkbox
//extraer duplicados
function createCB(array) {

    let mapcat = array.map(categ => categ.category);
    let category = Array.from(new Set(mapcat));
    category.sort();
    console.log(category);

    let cont = 0;
    category.forEach(element => {
        ++cont;
        pltcategory.querySelector('.form-check-input').value = element;
        pltcategory.querySelector('.form-check-input').id = "chkbox" + cont;
        pltcategory.querySelector('.form-check-label').textContent = element;
        pltcategory.querySelector('.form-check-label').htmlFor = "chkbox" + cont;

        const chkclon = pltcategory.cloneNode(true);
        fragcheck.appendChild(chkclon);

    })
    fcheck.appendChild(fragcheck);

}

function fillcard(arrayfill) {


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




// ----------------------------------------------------
let filtercat = "";

const contcard = document.querySelector("#cardMain"); //contenedor cards
const fragment = document.createDocumentFragment();
const template = document.querySelector('#card-tpl').content; //template card

const fcheck = document.querySelector(".check"); //contenedor checkbox
const pltcategory = document.querySelector("#tplcat").content; //template checkbox
const fragcheck = document.createDocumentFragment();


let date_today = data.currentDate;
let { events } = data;
const homeEvents = events.filter(ep => Date.parse(ep.date) !== Date.parse(date_today));


const search = document.querySelector("#button-addon2"); //btn seearch
const insearch = document.querySelector(".form-control"); //input search


insearch.addEventListener('keyup', () => {

    let searchFilter = searchInput(homeEvents, insearch.value);
    fillcard(searchFilter);

});

fcheck.addEventListener('change', () => {

    let checkFilter = searchChk(homeEvents);
    fillcard(checkFilter);

});


createCB(homeEvents);
fillcard(homeEvents);



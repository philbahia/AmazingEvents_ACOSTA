import data from "./amazing.js"
import { searchChk, searchInput, createCB, fillcard, filtering } from "./functions.js"


const fragment = document.createDocumentFragment();
const template = document.querySelector('#card-tpl').content; //template card
const fcheck = document.querySelector(".check"); //contenedor checkbox
const search = document.querySelector("#button-addon2"); //btn seearch

const insearch = document.querySelector(".form-control"); //input search
let txtinput = insearch.value.toLowerCase();

let date_today = data.currentDate;
const homeEvents = data.events;

console.log("txtinput");
console.log(insearch);


insearch.addEventListener('keyup', () => {

    txtinput = insearch.value.toLowerCase();

    let hetFilter = filtering(homeEvents, txtinput);
    fillcard(hetFilter);

});


fcheck.addEventListener('change', () => {

    let chksfilter = filtering(homeEvents, txtinput);
    fillcard(chksfilter);
});

createCB(homeEvents, fcheck);
fillcard(homeEvents);



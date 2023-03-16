import data from "./amazing.js"
import { searchChk, searchInput, createCB, fillcardb, filtering } from "./functions.js"


const fragment = document.createDocumentFragment();
const template = document.querySelector('#card-tpl').content; //template card
const fcheck = document.querySelector(".check"); //contenedor checkbox
const search = document.querySelector("#button-addon2"); //btn seearch

const insearch = document.querySelector(".form-control"); //input search
let txtinput = insearch.value.toLowerCase();

let date_today = data.currentDate;
const futureEvents = data.events.filter(ep => Date.parse(ep.date) > Date.parse(date_today));

console.table(futureEvents);


insearch.addEventListener('input', () => {

    txtinput = insearch.value.toLowerCase();

    let hetFilter = filtering(futureEvents, txtinput);
    fillcardb(hetFilter);

});


fcheck.addEventListener('change', () => {

    let chksfilter = filtering(futureEvents, txtinput);
    fillcardb(chksfilter);
});

let paso = "./assets/pages/details.html?id=" ;
createCB(futureEvents, fcheck);
fillcardb(futureEvents);








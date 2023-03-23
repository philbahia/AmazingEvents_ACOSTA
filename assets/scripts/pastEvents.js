//import data from "./amazing.js"
import { createCB, fillcardb, crossfilter, downData } from "./functions.js"

const data = await downData();

const fragment = document.createDocumentFragment();
const template = document.querySelector('#card-tpl').content; //template card
const fcheck = document.querySelector(".check"); //contenedor checkbox
const search = document.querySelector("#button-addon2"); //btn seearch

const insearch = document.querySelector(".form-control"); //input search
let txtinput = insearch.value.toLowerCase();

let date_today = data.currentDate;
const pastEvents = data.events.filter(ep => Date.parse(ep.date) < Date.parse(date_today));


insearch.addEventListener('input', () => {

    txtinput = insearch.value.toLowerCase();
    let hetFilter = crossfilter(pastEvents, txtinput);
    fillcardb(hetFilter, template);

});


fcheck.addEventListener('change', () => {

    let chksfilter = crossfilter(pastEvents, txtinput);
    fillcardb(chksfilter,template);
});

createCB(pastEvents, fcheck);
fillcardb(pastEvents,template);









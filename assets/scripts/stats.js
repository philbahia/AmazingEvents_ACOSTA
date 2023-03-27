import { downData, getCategory, filltblC, firstTable } from "./functions.js";


let data = await downData();


let date_today = data.currentDate;
const statsEvents = data.events;
const futureEvents = data.events.filter(ep => Date.parse(ep.date) > Date.parse(date_today));
const pastEvents = data.events.filter(ep => Date.parse(ep.date) < Date.parse(date_today));


const catEvent = getCategory(futureEvents);
const catpEvent = getCategory(pastEvents);



let contenedorA = document.querySelector('.tblA');
let contenedorC = document.querySelector('.tblC');
let contenedorB = document.querySelector('.tblB');



firstTable(statsEvents);
filltblC(catEvent, contenedorB);
filltblC(catpEvent, contenedorC);



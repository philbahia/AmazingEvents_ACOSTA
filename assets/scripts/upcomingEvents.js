import data from "./amazing.js";

//recupero fecha
const date_today = data.currentDate;

console.log(date_today);

//desestructura object data
let {events} = data;
//creamos array de objetos events
console.log(events);

let filtrado = events.filter(e => e.date >= date_today);

console.log(filtrado);

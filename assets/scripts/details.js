import data from "./amazing.js";

let detalle = document.getElementById("detail-li");
console.log(data.currentDate);

let imagen = data.events[7].image;
console.log(data.events[7].category);
console.log(imagen);

let imgCardDetail = document.getElementById("bigcard")

imgCardDetail.src = imagen;

const prueba = data.events;
console.table(prueba);
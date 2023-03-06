import data from "./amazing.js";


//recupero fecha
const date_today = data.currentDate;
console.log(date_today);

//desestructura object data
let { events } = data;
//creamos array de objetos events
console.log("array eventos");
console.log(events);

let pastEvents = events.filter(ep => ep.date < date_today);

//function pastEvents (ep) {
//    return ep.data < date_today;}

console.log("array eventos filtrado");
    console.table(pastEvents);

//categorias
let category = pastEvents.filter((item, index) => {
    return pastEvents.indexOf(item) === index;
})


pastEvents.forEach(element => {
    console.log(element.image);
    let imgpe1 = document.getElementById("imgp1");
    imgpe1.src = element.image;
});


let padre = document.querySelector("#cardMain");
let copia = document.querySelector(".card");
let clon = copia.cloneNode(true);
       

let clon2 = copia.cloneNode(true);
let clon3 = copia.cloneNode(true);
let clon4 = copia.cloneNode(true);

console.log(padre);
console.log(copia);
console.log(clon);


padre.appendChild(clon);
padre.appendChild(clon);
padre.appendChild(clon2);
padre.appendChild(clon3);
//document.querySelector("#cardMain").appendChild(clon4);



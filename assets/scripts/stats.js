import { downData, getCategory, filltblC } from "./functions.js";


let data = await downData();


let date_today = data.currentDate;
const statsEvents = data.events;
const futureEvents = data.events.filter(ep => Date.parse(ep.date) > Date.parse(date_today));
const pastEvents = data.events.filter(ep => Date.parse(ep.date) < Date.parse(date_today));


const catEvent = getCategory(futureEvents);
const catpEvent = getCategory(pastEvents);


let fila = '';
let contenedor = document.querySelector('.tblA');
let pluspercentage = '';
let plusatt = 0;
let minuspercentage = '';
let minusatt = statsEvents[33].capacity;
let pluscapacity = '';

let contenedorC = document.querySelector('.tblC');
let contenedorB = document.querySelector('.tblB');

console.log(pluspercentage);

highAttendance(statsEvents);

function highAttendance(array) {
    let tmparray = [];

    tmparray = array.map(item => {
        let gana = {
            "name": item.name,
            "assist": (item.estimate ? item.estimate : item.assistance) / item.capacity * 100,
            capacity: item.capacity
        };
        return gana;
    })

    tmparray.sort((x, y) => {
        if (x.assist < y.assist) {
            return -1;
        }
        if (x.assist > y.assist) {
            return 1;
        }

        return 0;
    });


    console.log("1 Tabla");
    console.table(tmparray);
    console.log(tmparray);

    //let pluscapacity = tmparray.find(mayor => );
    minuspercentage = tmparray[0].name;
    minusatt = tmparray[0].capacity;
    pluspercentage = tmparray[tmparray.length - 1].name;
    plusatt = tmparray[tmparray.length - 1].capacity;
    pluscapacity = tmparray.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current).name;
}


fila = `<tr>
            <td>${pluspercentage} - (${plusatt})</td>
            <td>${minuspercentage} - (${minusatt})</td>
            <td>${pluscapacity} </td>
        </tr>`;

contenedor.innerHTML = fila;

filltblC(catEvent, contenedorB);
filltblC(catpEvent, contenedorC);



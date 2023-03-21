import { downData, getCategory } from "./functions.js";


let data = await downData();


let date_today = data.currentDate;
const statsEvents = data.events;
const futureEvents = data.events.filter(ep => Date.parse(ep.date) > Date.parse(date_today));
const pastEvents = data.events.filter(ep => Date.parse(ep.date) < Date.parse(date_today));

console.log(statsEvents);
console.log(date_today);

const catEvent = getCategory(futureEvents);
const catpEvent = getCategory(pastEvents);

console.log(catEvent);


let fila = '';
let contenedor = document.querySelector('.tblA');
let pluspercentage = '';
let plusatt = statsEvents[0].capacity;
let minuspercentage = '';
let minusatt = statsEvents[33].capacity;

console.log(pluspercentage);

highAttendance(statsEvents);

function highAttendance(array){
    let tmparray =[];

    tmparray = array.map(item => {
        let gana = {
            "name": item.name,
            "assist": (item.estimate? item.estimate : item.assistance)/item.capacity*100
        };
        return gana;
    })
    
    
    tmparray.sort((x,y)=> {
        if (x.assist < y.assist){
            return -1;
        }
        if (x.assist > y.assist){
            return 1;
        }
        
        return 0;
    });

    
    /* console.log("1 Tabla");
    console.table(tmparray);
    console.log(tmparray); */
    minuspercentage= tmparray[0].name;
    pluspercentage = tmparray[tmparray.length-1].name;
}

fila = `<tr>
            <td>${ pluspercentage } - (${ plusatt })</td>
            <td>${ minuspercentage } - (${ minusatt })</td>
            <td></td>
        </tr>`;

        contenedor.innerHTML = fila;

filltblB(catEvent);
filltblC(catpEvent);

function filltblB(array){

    let contenedor = document.querySelector('.tblB');

    let fila = '';
    array.forEach(element => {
    let porcentage = ((element.calculate/element.quant)*100).toFixed(2);
        fila += `<tr>
        <td>${ element.category } (${ element.items }) </td>
        <td>$ ${ element.revenue }</td>
        <td>${ porcentage } %</td>
    </tr>`;
    
    });
    contenedor.innerHTML = fila;

}
function filltblC(array){

    let contenedor = document.querySelector('.tblC');

    let fila = '';
    array.forEach(element => {
        let porcentage = ((element.calculate/element.quant)*100).toFixed(2);
        fila += `<tr>
        <td>${ element.category }  (${ element.items }) </td>
        <td>$ ${ element.revenue }</td>
        <td>${ porcentage } %</td>
    </tr>`;
    
    });
    contenedor.innerHTML = fila;

}
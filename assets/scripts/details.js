import data from "./amazing.js";

let date_today = data.currentDate;
let { events } = data;
const detailEvents = events.filter(ep => Date.parse(ep.date) !== Date.parse(date_today));


let queryString = location.search;
let params = new URLSearchParams(queryString);

console.log(queryString)
console.log(params);

let id = params.get("id");
console.log(id);
let ficha = detailEvents.find(events => events._id == parseInt(id) );
let { _id, image, name, ... fichas } = ficha;
console.log(fichas);

document.querySelector("#bigcard").src = ficha.image;
document.querySelector(".card-title").textContent = ficha.name;

const lista = document.querySelector("#detail-li");
const template = document.querySelector("#tpl-li").content;
const fragment = document.createDocumentFragment();

Object.entries(fichas).forEach( ([key, value])=> {

    let subtitle = key.charAt(0).toUpperCase().concat(key.substring(1, key.length));
    template.querySelector('.dtl-li').textContent = key         + ": " + value;
    
    let clondetail = template.cloneNode(true);
    fragment.appendChild(clondetail);
    console.log(key + ": " + value);
});

lista.appendChild(fragment);




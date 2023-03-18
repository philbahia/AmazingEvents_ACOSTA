//import data from "./amazing.js";
import { downData } from "./functions.js";


let data = await downData();


let date_today = data.currentDate;
//let { events } = data;
const detailEvents = data.events;

console.log(detailEvents);
let queryString = location.search;
let params = new URLSearchParams(queryString);


let id = params.get("id");

let ficha = detailEvents.find(events => events._id == parseInt(id));
let { _id, image, name, ...fichas } = ficha;

document.querySelector("#bigcard").src = ficha.image;
document.querySelector(".card-title").textContent = ficha.name;

const lista = document.querySelector("#detail-li");
const templat = document.querySelector("#tpl-li").content;
const fragment = document.createDocumentFragment();

Object.entries(fichas).forEach(([key, value]) => {

    let subtitle = key.charAt(0).toUpperCase().concat(key.substring(1, key.length));
    templat.querySelector('.dtl-li').textContent = key + ": " + value;

    let clondetail = templat.cloneNode(true);
    fragment.appendChild(clondetail);

});

lista.appendChild(fragment);




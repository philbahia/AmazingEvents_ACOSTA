import data from "./amazing.js";

let queryString = location.search;
let params = new URLSearchParams(queryString);
let id = params.get("id");

let ficha = data.find(events => events.id == id )





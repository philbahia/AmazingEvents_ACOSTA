import data from "./amazing.js"



console.log(data.currentDate);
//let categoria = data.events[1].category;

let imagen = data.events[13].image;
console.log(data.events[13].category);
console.log(imagen);

let imgcard1 = document.getElementById("card1-img");
imgcard1.src = imagen;

document.getElementById("card1-h5").innerHTML = data.events[13].name ;
document.getElementById("card1-p").innerHTML = data.events[13].description;
document.getElementById("card1-price").innerHTML = "$ " + data.events[13].price;

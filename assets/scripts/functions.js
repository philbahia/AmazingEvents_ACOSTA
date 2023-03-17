
async function downData() {
    let data = await fetch("/assets/data/amazing.json")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        
    return data    
}

function searchChk(array) {

    console.log("entrada al search<<<<")
    console.log(array);
    let checkbox = document.querySelectorAll(".form-check-input");
    const boxchk = document.querySelector(".form-check");
    let arrchk = Array.from(checkbox);
    let arrchks = arrchk.filter(chk => chk.checked)
    let aarrchks = arrchks.map(chk => chk.value)
    let chksfilter = array.filter(element => aarrchks.includes(element.category));

    console.log("Salida filtro check");
    console.log(chksfilter);

    if (aarrchks.length > 0) {
        return chksfilter;
    }
    return array;

}


function searchInput(array, word) {
   
    let hetFilter = array.filter(ep => ep.name.toLowerCase().includes(word));
    
    return hetFilter;
}

function createCB(array, contiene) {

    
    const pltcategory = document.querySelector("#tplcat").content; //template checkbox
    const fragcheck = document.createDocumentFragment();

    let mapcat = array.map(categ => categ.category);
    let category = Array.from(new Set(mapcat));
    category.sort();

    let cont = 0;
    category.forEach(element => {
        ++cont;
        pltcategory.querySelector('.form-check-input').value = element;
        pltcategory.querySelector('.form-check-input').id = "chkbox" + cont;
        pltcategory.querySelector('.form-check-label').textContent = element;
        pltcategory.querySelector('.form-check-label').htmlFor = "chkbox" + cont;

        const chkclon = pltcategory.cloneNode(true);
        fragcheck.appendChild(chkclon);

    })
    contiene.appendChild(fragcheck);

}

const template = document.querySelector('#card-tpl').content;
function fillcard(arrayfill) {
    const contcard = document.querySelector("#cardMain");

    if (arrayfill.length == 0) {
        contcard.innerHTML = `<div class="message p-2"><h3 class="border p-2 fw-bolder text-primary-emphasis text-center">There is no match</h3>
        <h2 class="border text-center text-primary"> Please refine your search</h2></div>`

        return
    }

    const fragment = document.createDocumentFragment();


    contcard.innerHTML = '';

    arrayfill.forEach(event => {
        template.querySelector('.card-img-top').src = event.image;
        template.querySelector('.card-title').textContent = event.name;
        template.querySelector('.card-text').textContent = event.description;
        template.querySelector('.card-price').textContent = "$ " + event.price;
        template.querySelector('.btndetail').href = "./assets/pages/details.html?id=" + event._id;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);

    })

    contcard.appendChild(fragment);
}

function fillcardb(arrayfill) {

    let contcard = document.querySelector("#cardMain");
    if (arrayfill.length == 0) {
        console.log("no coincidencias")
        contcard.innerHTML = `<div class="message p-2"><h3 class="border p-2 fw-bolder text-primary-emphasis text-center">There is no match</h3>
        <h2 class="border text-center text-primary"> Please refine your search</h2></div>`
        return
    }

    let fragment = document.createDocumentFragment();


    contcard.innerHTML = '';

    arrayfill.forEach(event => {
        template.querySelector('.card-img-top').src = event.image;
        template.querySelector('.card-title').textContent = event.name;
        template.querySelector('.card-text').textContent = event.description;
        template.querySelector('.card-price').textContent = "$ " + event.price;
        template.querySelector('#bt-detailb').href = "./details.html?id=" + event._id;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);

    })

    contcard.appendChild(fragment);
}

function filtering(arrayhome, texto) {
    console.log("ahome");
    console.log(arrayhome);

    let filterA = searchInput(arrayhome, texto);

    console.log("filerA>>>>");
    console.log(filterA);
    let filterB = searchChk(filterA);
    console.log("filerB>>>>");
    console.log(filterB);

    if (filterB.length == 0) {
        // filterB = arrayhome
    }


    return filterB;

}

export { searchChk, searchInput, createCB, fillcard, fillcardb, filtering, downData }

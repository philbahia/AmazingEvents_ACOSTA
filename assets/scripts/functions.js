
async function downData() {
    let data = await fetch("/assets/data/amazing.json")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((error) => console.log(error))
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


function getCategory(array) {


    //let matarray = array.map(cat => (cat.category));
    let matrray = [];
    matrray = array.map(cat => {
        let gana = {
            "category": cat.category,
            "revenue": cat.price * (cat.estimate?cat.estimate:cat.assistance),
            "capacity": cat.capacity,
            "assist": cat.estimate? cat.estimate : cat.assistance
        };
        return gana;
    })

    let tmpcateg = '';
    let tmprevenue = 0;
    let tmpc=0;
    let tmpq=0;
    let matarray = [];
    
    let puntero = 0;
    let items = 0;

    matrray.sort((x,y)=> {
        if (x.category < y.category){
            return -1;
        }
        if (x.category > y.category){
            return 1;
        }

        return 0;
    });


    matrray.forEach(item => {

        if (tmpcateg !== item.category) {
            tmpcateg = item.category;
            puntero ++;
            items = 1;
            let subtotal = {
                "category": tmpcateg,
                "revenue": item.revenue,
                "quant": item.capacity,
                "calculate": item.assist,
                "items": items
            };
            
            matarray.push(subtotal);
            tmprevenue = item.revenue; 
            tmpc = item.capacity;
            tmpq = item.assist;

            console.log(tmpcateg);
        }else{
            tmprevenue += item.revenue;
            tmpc += item.capacity;
            tmpq += item.assist;
            items ++;
            matarray[puntero-1].revenue = tmprevenue;
            matarray[puntero-1].quant = tmpc;
            matarray[puntero-1].calculate = tmpq;
            matarray[puntero-1].items = items;
            
        }
        console.log(tmprevenue);

    })

    let category = matarray
    
   /*  category.sort((x,y)=> {
        if (x.category < y.category){
            return -1;
        }
        if (x.category > y.category){
            return 1;
        }

        return 0;
    }); */

    console.table(matrray);
    console.log(matarray);
    console.table(category);

    return category;
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

function fillcard(arrayfill, template) {
    //const template = document.querySelector('#card-tpl').content;
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

function fillcardb(arrayfill, template) {
    //const template = document.querySelector('#card-tpl').content;
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

export { searchChk, searchInput, createCB, fillcard, fillcardb, filtering, downData, getCategory }

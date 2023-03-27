/*function downData
Obtener datos en forma asincronica
*/
async function downData() {
    let data = await fetch("/assets/data/amazing.json")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((error) => console.log(error))
    return data
}

/*function searchChk
Filtra Array por categorias seleccionados x chkbox
array: Array de Eventos
return => Array de Eventos filtrado x categoria
*/
function searchChk(array) {

    let checkbox = document.querySelectorAll(".form-check-input");
    const boxchk = document.querySelector(".form-check");
    let arrchk = Array.from(checkbox);
    let arrchks = arrchk.filter(chk => chk.checked)
    let aarrchks = arrchks.map(chk => chk.value)
    let chksfilter = array.filter(element => aarrchks.includes(element.category));


    if (aarrchks.length > 0) {
        return chksfilter;
    }
    return array;

}

/*function searchInput
Filtra Array por texto del input
array: Array de Eventos
word: texto ingresado en el input
return => Array Eventos filtrado por texto
*/
function searchInput(array, word) {

    let hetFilter = array.filter(ep => ep.name.toLowerCase().includes(word));

    return hetFilter;
}

/*function getCategory
Genera nuevo array para totalizar por categorias
array: Array de Eventos
return => Array Eventos categorias totalizadas
*/
function getCategory(array) {


    let matrray = [];
    matrray = array.map(cat => {
        let gana = {
            "category": cat.category,
            "revenue": cat.price * (cat.estimate ? cat.estimate : cat.assistance),
            "capacity": cat.capacity,
            "assist": cat.estimate ? cat.estimate : cat.assistance
        };
        return gana;
    })

   

    let tmpcateg = '';
    let tmprevenue = 0;
    let tmpc = 0;
    let tmpq = 0;
    let matarray = [];

    let puntero = 0;
    let items = 0;


    matrray.sort((x, y) => x.category.localeCompare(y.category));
   
    matrray.forEach(item => {

        if (tmpcateg !== item.category) {
            tmpcateg = item.category;
            puntero++;
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
        } else {
            tmprevenue += item.revenue;
            tmpc += item.capacity;
            tmpq += item.assist;
            items++;
            matarray[puntero - 1].revenue = tmprevenue;
            matarray[puntero - 1].quant = tmpc;
            matarray[puntero - 1].calculate = tmpq;
            matarray[puntero - 1].items = items;

        }
       

    })
   
    return matarray;
}

/*function createCB
Genera y dibuja categorias en checkbox
array: Array de Eventos
contiene: container Checkbox
*/
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


/*fumction fillcard
Pintar cards
arrayfill: Array de eventos
template: plantilla html
*/
function fillcard(arrayfill, template) {

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

/*function firstTable
Genera nuevo Array para visualizar topes de asistencia
array: Array de Eventos
*/
function firstTable(array) {
    let tmparray = [];

    tmparray = array.map(item => {
        let gana = {
            name: item.name,
            assist: (item.estimate ? item.estimate : item.assistance) / item.capacity * 100,
            capacity: item.capacity
        };
        return gana;
    })

    tmparray.sort((x,y) => x.assist - y.assist);
    
    filltblA(tmparray);
};


/*function filltblA
Pintar tabla 1
tmparray: Array totalizados de eventos para primer tabla
*/
function filltblA(tmparray) {

    console.log("1 Tabla");
    console.table(tmparray);
    console.log(tmparray);

    let contenedor = document.querySelector('.tblA');
    let fila = '';
    let minuspercentage = tmparray[0].name;
    let minusatt = tmparray[0].assist;
    let pluspercentage = tmparray[tmparray.length - 1].name;
    let plusatt = tmparray[tmparray.length - 1].assist;
    let pluscapacity = tmparray.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current).name;

    fila = `<tr>
                <td>${pluspercentage} - (${plusatt} %)</td>
                <td>${minuspercentage} - (${minusatt} %)</td>
                <td>${pluscapacity} </td>
            </tr>`;

    contenedor.innerHTML = fila;

}

/*fumction fillcardb
Pintar cards
arrayfill: Array de eventos
template: plantilla html
*/
function fillcardb(arrayfill, template) {

    let contcard = document.querySelector("#cardMain");
    if (arrayfill.length == 0) {
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

/*function crossfilter
Realiza filtro cruzado entre filtro por texto y filtro x categoria
arrayhome: Array de Eventos
texto: texto ingresado en inputbox
return => Array de eventos filtrado
*/
function crossfilter(arrayhome, texto) {
    let filterA = searchInput(arrayhome, texto);
    let filterB = searchChk(filterA);

    return filterB;
}

/* function filltblC
Dibuja tabla 2 y 3 del Stats
array: Array de objetos a ser pintado
contenedor: container HTML
 */
function filltblC(array, contenedor) {


    let fila = '';
    array.forEach(element => {
        let porcentage = ((element.calculate / element.quant) * 100).toFixed(2);
        fila += `<tr>
                    <td>${element.category}  (${element.items}) </td>
                    <td>$ ${element.revenue}</td>
                    <td>${porcentage} %</td>
                </tr>`;

    });
    contenedor.innerHTML = fila;

}

export { searchChk, searchInput, createCB, fillcard, fillcardb, filltblC, crossfilter, downData, getCategory, firstTable }

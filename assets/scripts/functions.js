

function fillcard(arrayfill) {

    if (arrayfill.length == 0) {
        console.log("Vacia");
        arrayfill = homeEvents;
    }
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

function createCB(array) {
    
    let mapcat = array.map(categ => categ.category);
    let category = Array.from(new Set(mapcat));
    category.sort();
    console.log(category);

    let cont = 0;
    category.forEach(element => {
        pltcategory.querySelector('.form-check-input').value = element;
        pltcategory.querySelector('.form-check-input').id = "chkbox" + cont;
        pltcategory.querySelector('.form-check-label').textContent = element;
        pltcategory.querySelector('.form-check-label').htmlFor = "chkbox" + cont;

        const chkclon = pltcategory.cloneNode(true);
        fragcheck.appendChild(chkclon);

    })
    fcheck.appendChild(fragcheck);

}

function searchInput(array, text) {
    
    let word = insearch.value.toLowerCase();
    let hetFilter = array.filter(ep => ep.name.toLowerCase().includes(word));
    return hetFilter;
}


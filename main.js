
$("body").css("background-color", "pink");
$("h2").css("text-align","center").css("font-size", "70px").css("color", "red");
$("h5").css("color","gold")

const  Clickbutton = document.querySelectorAll (`.button`);
const tbody = document.querySelector (`.tbody`);
let carrito = [];

////***************** */


const botonA = document.querySelector("#btnA");
const containerA = document.querySelector(".containerA");


const obtenerDatos = ()=>{
    fetch("json.json")
        .then(response => response.json())
        .then((result) => {
            let datos = result;
            datos.forEach(user => {
                containerA.innerHTML += `
                
                <div class="col d-flex justify-content-center mb-4"> </div>
                <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;"></div>
                  <h5 class="card-title pt-2 text-center">${user.producto}</h5>
                  <img src="${user.imagen}" class="card-img-top" alt="...">
                  <div class="card-body"></div>
                    <p class="card-text text-white-50 description"></p>
                    <h5 class="">Precio: $<span class="precio">${user.precio}</span></h5>
                    <div class="d-grid gap-2">  </div>
                      <button class="btn btn-primary button">Añadir a Carrito</button>
                `
            })
        })
        .catch(error => console.log(error))

}


obtenerDatos ()

/////////////////******************************** */

Clickbutton.forEach (btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem (e) {
    const button = e.target;
    const item = button.closest (`.card`);
    const itemTitle = item.querySelector (`.card-title`).textContent;
    const itemPrice = item.querySelector (`.precio`).textContent;
    const itemImg = item.querySelector (`.card-img-top`).src;
    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }
    addItemCarrito (newItem)

}

function addItemCarrito (newItem) {
   
    carrito.push (newItem);
    renderCarrito ()
}

function renderCarrito () {
    tbody.innerHTML = ` `;
    carrito.map (item => {
        const tr = document.createElement (`tr`);
        tr.classList.add (`itemCarrito`);
        const Content = `
        <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
        `
        tr.innerHTML = Content;
        tbody.appendChild (tr);
    })
    
    addLocalStorage ()
}

function addLocalStorage () {
    localStorage.setItem (`carrito`, JSON.stringify (carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem(`carrito`));
    if (storage) {
        carrito = storage;
        renderCarrito ()
    }
}

let promociones = [];


fetch("./json/promo.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        promociones = data;
        cargarPromos(promociones);
        actualizarBotonesAgregar();
    })


const carritoCount = document.querySelector("#carrito-count")
const promocionesContainer = document.getElementById("card-promos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

function cargarPromos() {
    promociones.forEach(promo => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-xl-3', 'col-md-6', 'col-sm-12');
        cardDiv.innerHTML = `
                <div class="card text-center">
                    <img src="${promo.imagen}" class="card-img-top img-prom" alt="${promo.nombre}">
                    <div class="card-body">
                        <h3 class="card-title">${promo.nombre}</h3>
                        <p class="card-text">${promo.descripcion}</p>
                        <p class="card-text">$${promo.precio}</p>
                        <button type="button" class="btn colorBtn producto-agregar" id="${promo.id}">Agregar al carrito</button>     

                    </div>
                </div>
            `;
        promocionesContainer.append(cardDiv);
    })
    actualizarBotonesAgregar();

}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");


    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

const localProductosEnCarrito = localStorage.getItem("promoEnCarrito");

if (localProductosEnCarrito) {
    productosEnCarrito = JSON.parse(localProductosEnCarrito);
    contarNumero()
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem",
            color: "white",
            background: "black"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;

    const promoCount = promociones.find(promo => promo.id === idBoton);


    if (productosEnCarrito.some(promociones => promociones.id === idBoton)) {
        const index = productosEnCarrito.findIndex(promociones => promociones.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        promoCount.cantidad = 1;
        productosEnCarrito.push(promoCount);
    }

    contarNumero()

    localStorage.setItem("promoEnCarrito", JSON.stringify(productosEnCarrito));
}

function contarNumero() {
    let countNumero = productosEnCarrito.reduce((acc, promo) =>
        acc + promo.cantidad, 0);
    carritoCount.innerText = countNumero;
}
const promocionesContainer = document.getElementById("card-promos");

fetch("./json/promo.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
        }
        return response.json();    
    })
    .then(data => {
        data.forEach(promo => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('col-xl-3', 'col-md-6', 'col-sm-12');
            cardDiv.innerHTML = `
                <div class="card text-center">
                    <img src="${promo.imagen}" class="card-img-top img-prom" alt="${promo.nombre}">
                    <div class="card-body">
                        <h3 class="card-title">${promo.nombre}</h3>
                        <p class="card-text">${promo.descripcion}</p>
                        <p class="card-text">$${promo.precio}</p>
                        <button type="button" class="btn colorBtn" data-precio="${promo.precio}">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            `;
            promocionesContainer.appendChild(cardDiv);
        });
    })
    .catch(error => {

        console.error('Error durante el fetch:', error.message);
    });




        
        
        // const listaProductos = document.getElementById("lista-productos");
        // const totalPrecioElement = document.getElementById("total-precio");
        // const botonesCarrito = document.querySelectorAll("button[data-precio]");
        // const comprarButton = document.getElementById("comprar-button");

        // const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];


        // function actualizarListaProductos() {
        //     listaProductos.innerHTML = "";
        //     let totalPrecio = 0;

        //     productosGuardados.forEach((precio, index) => {
        //         totalPrecio += precio;
        //         const listItem = document.createElement("li");
        //         listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        //         listItem.innerHTML = `<span>Producto ${index + 1}: $${precio}</span>
        //                              <button class="btn btn-danger eliminar-button" style="cursor: pointer;">Eliminar</button>`;
                
        //         listItem.querySelector(".eliminar-button").addEventListener("click", () => {
        //             productosGuardados.splice(index, 1);
        //             localStorage.setItem("productos", JSON.stringify(productosGuardados));
        //             actualizarListaProductos();
        //         });

        //         listaProductos.appendChild(listItem);
        //     });

        //     totalPrecioElement.textContent = totalPrecio;
        // }

        // actualizarListaProductos();

        // botonesCarrito.forEach((boton) => {
        //     boton.addEventListener("click", () => {
        //         const precio = parseFloat(boton.getAttribute("data-precio"));
        //         productosGuardados.push(precio);
        //         localStorage.setItem("productos", JSON.stringify(productosGuardados));
        //         actualizarListaProductos();
        //     });
        // });

        // comprarButton.addEventListener("click", () => {
        //     if (productosGuardados.length > 0) {
        //         alert("¡Compra exitosa! Gracias por su compra.");
        //         productosGuardados.length = 0;
        //         localStorage.removeItem("productos");
        //         actualizarListaProductos();
        //     } else {
        //         alert("El carrito de compras está vacío. Agregue productos antes de comprar.");
        //     }
        // });




       

        
       
           
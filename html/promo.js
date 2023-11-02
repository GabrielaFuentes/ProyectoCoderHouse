        const listaProductos = document.getElementById("lista-productos");
        const totalPrecioElement = document.getElementById("total-precio");
        const botonesCarrito = document.querySelectorAll("button[data-precio]");
        const comprarButton = document.getElementById("comprar-button");

        const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];


        function actualizarListaProductos() {
            listaProductos.innerHTML = "";
            let totalPrecio = 0;

            productosGuardados.forEach((precio, index) => {
                totalPrecio += precio;
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                listItem.innerHTML = `<span>Producto ${index + 1}: $${precio}</span>
                                     <button class="btn btn-danger eliminar-button" style="cursor: pointer;">Eliminar</button>`;
                
                listItem.querySelector(".eliminar-button").addEventListener("click", () => {
                    productosGuardados.splice(index, 1);
                    localStorage.setItem("productos", JSON.stringify(productosGuardados));
                    actualizarListaProductos();
                });

                listaProductos.appendChild(listItem);
            });

            totalPrecioElement.textContent = totalPrecio;
        }

        actualizarListaProductos();

        botonesCarrito.forEach((boton) => {
            boton.addEventListener("click", () => {
                const precio = parseFloat(boton.getAttribute("data-precio"));
                productosGuardados.push(precio);
                localStorage.setItem("productos", JSON.stringify(productosGuardados));
                actualizarListaProductos();
            });
        });

        comprarButton.addEventListener("click", () => {
            if (productosGuardados.length > 0) {
                alert("¡Compra exitosa! Gracias por su compra.");
                productosGuardados.length = 0;
                localStorage.removeItem("productos");
                actualizarListaProductos();
            } else {
                alert("El carrito de compras está vacío. Agregue productos antes de comprar.");
            }
        });


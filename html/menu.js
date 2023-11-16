const menuContainer = document.getElementById("card-menu");
 fetch("./json/menu.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                
                data.forEach(combo => {
                    const comboDiv = document.createElement('div');
                    comboDiv.classList.add('menus');
                    comboDiv.innerHTML = `
                        <div class="menu-img rounded-circle">
                            <img class="img-fluid" src="${combo.imagen}" alt="${combo.nombre}">
                        </div>
                        <div class="text-wrap">
                            <div class="row align-items-start">
                                <div class="col-sm-12 col-md-8 col-lg-5">
                                    <h4>${combo.nombre}</h4>
                                </div>
                                <div class="col-sm-12 col-md-8 col-lg-5">
                                    <h4 class="text-muted menu-price">$${combo.precio}</h4>
                                </div>
                            </div>
                            <p>${combo.descripcion}</p>
                        </div>
                    `;
                    menuContainer.appendChild(comboDiv);
                });
            })
            .catch(error => {
                console.error('Error durante el fetch:', error.message);
            });



document.addEventListener("DOMContentLoaded", () => {
  const botonBuscar = document.querySelector("#buscar");
  botonBuscar.addEventListener("click", buscarProductos);

  function buscarProductos() {
    const terminoBusqueda = document
      .querySelector("#busqueda")
      .value.toLowerCase();

    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        const productosFiltrados = data.filter((producto) =>
          producto.titulo.toLowerCase().includes(terminoBusqueda)
        );

        const contenedorProductos = document.getElementById("shop");
        contenedorProductos.innerHTML = "";

        if (productosFiltrados.length === 0) {
          contenedorProductos.innerHTML = "<p>No se encontraron productos</p>";
        } else {
          productosFiltrados.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
              <img class="product-img" src="${producto.imagen}">
              <div class="product-info">
                <div class="product-text">
                  <h1 class="producto-titulo">${producto.titulo}</h1>
                  <h2 class="producto-subtitulo">${producto.subtitulo}</h2>
                  <p class="producto-descripcion">${producto.descripcion}</p>
                </div>
                <div class="product-price-btn">
                  <p>$<span>${producto.precio}</span></p>
                  <button class="agregar-carrito-btn" type="button">Agregar al carrito</button>
                </div>
              </div>
            `;

            const agregarCarritoBtn = card.querySelector(
              ".agregar-carrito-btn"
            );
            agregarCarritoBtn.addEventListener("click", () => {
              agregarAlCarrito(producto);
            });

            contenedorProductos.appendChild(card);
          });
        }
      })
      .catch((error) => {
        console.log("Error al cargar los datos:", error);
      });
  }

  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const repeatProduct = carrito.find((prod) => prod.id === producto.id);

    if (repeatProduct) {
      repeatProduct.cantidad++;
    } else {
      carrito.push({
        id: producto.id,
        imagen: producto.imagen,
        titulo: producto.titulo,
        precio: producto.precio,
        cantidad: 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
  }
});

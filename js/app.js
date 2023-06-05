const shop = document.getElementById("shop");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const indiceCarrito = document.getElementById("indice-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const taerProductos = async () => {
  const respuesta = await fetch("data.json");
  const data = await respuesta.json();
  console.log(data);

  data.forEach((product, index) => {
    const cards = document.createElement("div");
    cards.innerHTML = `
 <div class="card">
            <img class="product-img" src="${product.imagen}"> 
            <div class="product-info">
                <div class="product-text">
                    <h1 class="producto-titulo">${product.titulo}</h1>
                    <h2 class="producto-subtitulo">${product.subtitulo}</h2>
                    <p class="producto-descripcion">${product.descripcion} </p>
                </div>
                <div class="product-price-btn">
                  <p ><spam>$ ${product.precio}</spam></p>
                          
                </div>
            </div>

`;
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    cardContainer.append(cards);

    shop.append(cards);

    let comprar = document.createElement("button");
    comprar.className = "product-price-btn button";
    comprar.innerText = "Agregar al carrito";

    cards.querySelector(".product-price-btn").append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          imagen: product.imagen,
          titulo: product.titulo,
          precio: product.precio,
          cantidad: product.cantidad,
        });
      }
      console.log(carrito);
      contadorCarrito();
      carritoStorage();
    });
  });
};

taerProductos();

const carritoStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

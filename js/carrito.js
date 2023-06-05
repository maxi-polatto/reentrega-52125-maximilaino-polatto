const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalNav = document.createElement("div");
  modalNav.className = "modal-nav";
  modalNav.innerHTML = `
  <h1 class="modal-nav-title">Carrito</h1>

  `;
  modalContainer.append(modalNav);
  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "❌";
  modalbutton.className = "modal-nav-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalNav.append(modalbutton);

  carrito.forEach((product) => {
    let carritoCont = document.createElement("div");
    carritoCont.className = "modal-content";
    carritoCont.innerHTML = `
  <img class="product-img" src="${product.imagen}"> 
  <h1 class="producto-titulo">${product.titulo}</h1>
  <p ><spam>$ ${product.precio}</spam></p>
  <span class="restar"> ➖ </span>
  <p>Cantidad: ${product.cantidad}</p>
  <span class="sumar"> ➕ </span>
  <p>sub-total: ${product.cantidad * product.precio}</p>
   <span class="eliminar-product"> ❌ </span>
  `;
    modalContainer.append(carritoCont);
    console.log(carrito.lentgh);

    let restar = carritoCont.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad >= 1) {
        product.cantidad--;
      }
      carritoStorage();

      pintarCarrito();
    });

    let sumar = carritoCont.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      carritoStorage();

      pintarCarrito();
    });

    let eliminar = carritoCont.querySelector(".eliminar-product");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
      carritoStorage();

      pintarCarrito();
    });
  });
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalBuy = document.createElement("div");
  totalBuy.className = "total-content";
  totalBuy.innerHTML = `total a pagar: $${total}`;
  modalContainer.append(totalBuy);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  contadorCarrito();
  carritoStorage();
  pintarCarrito();
};

const contadorCarrito = () => {
  indiceCarrito.style.display = "flex";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  indiceCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
console.log(contadorCarrito);
contadorCarrito();

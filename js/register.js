document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let loginName = document.getElementById("loginName").value;
    let loginPassword = document.getElementById("loginPassword").value;

    let users = [];
    if (localStorage.getItem("users")) {
      users = JSON.parse(localStorage.getItem("users"));
    }

    let user = users.find(
      (u) => u.name === loginName && u.password === loginPassword
    );
    if (user) {
      window.location.href = "tienda.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nombre de usuario o contraseña incorrectos",
      });
    }

    document.getElementById("login-form").reset();
  });

document.getElementById("register-form");
document.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let password = document.getElementById("password").value;

  let newUser = { name, address, password };
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "./registro.html";
  document.getElementById("register-form").reset();
});
document
  .getElementById("button-ingreso")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "./registro.html";
  });

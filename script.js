const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_ID",
  appId: "TU_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
document.getElementById("login-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
document.getElementById("signup-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
document.getElementById("close-modal").onclick = () => {
  document.getElementById("auth-modal").style.display = "none";
};
document.getElementById("google-login").onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};
document.getElementById("facebook-login").onclick = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};
let carrito = [];
const actualizarCarrito = () => {
  const lista = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");
  lista.innerHTML = "";
  let suma = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
    suma += item.precio;
  });
  total.textContent = suma;
  count.textContent = carrito.length;
};
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const producto = e.target.parentElement;
    const nombre = producto.getAttribute("data-nombre");
    const precio = parseFloat(producto.getAttribute("data-precio"));
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});
document.getElementById("cart-btn").onclick = () => {
  document.getElementById("cart-modal").style.display = "flex";
};
document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-modal").style.display = "none";
};

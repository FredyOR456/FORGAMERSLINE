// Firebase config e inicialización
const firebaseConfig = {
  apiKey: "AIzaSyCrmASYryA6pNkzSVG4mRfLAH-iUtm0V5w",
  authDomain: "forgamersline-fd83c.firebaseapp.com",
  projectId: "forgamersline-fd83c",
  storageBucket: "forgamersline-fd83c.firebasestorage.app",
  messagingSenderId: "803913800026",
  appId: "1:803913800026:web:e9540ea527d7b571ecbb63"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Abrir modal login/registro
document.getElementById("login-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
document.getElementById("signup-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
// Cerrar modal auth
document.getElementById("close-modal").onclick = () => {
  document.getElementById("auth-modal").style.display = "none";
};

// Login con Google
document.getElementById("google-login").onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};

// Login con Facebook
document.getElementById("facebook-login").onclick = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};

// Carrito
let carrito = [];

const actualizarCarrito = () => {
  const lista = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

    // Botón para quitar producto
    const quitarBtn = document.createElement("button");
    quitarBtn.textContent = "❌ Quitar";
    quitarBtn.style.marginLeft = "10px";
    quitarBtn.onclick = () => {
      carrito.splice(index, 1); // Elimina el producto por índice
      actualizarCarrito(); // Refresca el carrito
    };

    li.appendChild(quitarBtn);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toFixed(2);
  count.textContent = carrito.length;
};

// Añadir productos al carrito desde botones
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const producto = e.target.parentElement;
    const nombre = producto.getAttribute("data-nombre");
    const precio = parseFloat(producto.getAttribute("data-precio"));
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});

// Abrir y cerrar modal carrito
document.getElementById("cart-btn").onclick = () => {
  document.getElementById("cart-modal").style.display = "flex";
};
document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-modal").style.display = "none";
};

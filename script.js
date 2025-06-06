// Firebase config y setup
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

// Modal login/signup
const authModal = document.getElementById("auth-modal");
const cartModal = document.getElementById("cart-modal");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const closeModalBtn = document.getElementById("close-modal");
const googleLoginBtn = document.getElementById("google-login");
const facebookLoginBtn = document.getElementById("facebook-login");

loginBtn.onclick = () => authModal.style.display = "flex";
signupBtn.onclick = () => authModal.style.display = "flex";
closeModalBtn.onclick = () => authModal.style.display = "none";

googleLoginBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};

facebookLoginBtn.onclick = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};

// Carrito de compras
let carrito = [];
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");

const actualizarCarrito = () => {
  cartItems.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;

    const quitarBtn = document.createElement("button");
    quitarBtn.textContent = "❌ Quitar";
    quitarBtn.onclick = () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    };
    li.appendChild(quitarBtn);
    cartItems.appendChild(li);
    suma += item.precio;
  });

  cartTotal.textContent = suma.toFixed(2);
  cartCount.textContent = carrito.length;
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

cartBtn.onclick = () => cartModal.style.display = "flex";
closeCartBtn.onclick = () => cartModal.style.display = "none";

// Menú lateral y categorías

const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const closeSidebarBtn = document.getElementById("close-sidebar");
const categoryButtons = document.querySelectorAll(".category-btn");
const sections = document.querySelectorAll(".productos");

hamburger.onclick = () => sidebar.classList.add("active");
closeSidebarBtn.onclick = () => sidebar.classList.remove("active");

categoryButtons.forEach(btn => {
  btn.onclick = () => {
    // Cambiar botón activo
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Mostrar sección correcta
    const cat = btn.getAttribute("data-category");
    sections.forEach(section => {
      if (section.id === cat) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Cerrar menú en móvil
    sidebar.classList.remove("active");
  };
});

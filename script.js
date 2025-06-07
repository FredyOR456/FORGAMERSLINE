// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrmASYryA6pNkzSVG4mRfLAH-iUtm0V5w",
  authDomain: "forgamersline-fd83c.firebaseapp.com",
  projectId: "forgamersline-fd83c",
  storageBucket: "forgamersline-fd83c.appspot.com", // <- corregido el dominio
  messagingSenderId: "803913800026",
  appId: "1:803913800026:web:e9540ea527d7b571ecbb63"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Mostrar modal de login o registro
document.getElementById("login-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
document.getElementById("signup-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
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
    li.textContent = `${item.nombre} - $${item.precio}`;

    const quitarBtn = document.createElement("button");
    quitarBtn.textContent = "❌ Quitar";
    quitarBtn.style.marginLeft = "10px";
    quitarBtn.onclick = () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    };

    li.appendChild(quitarBtn);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toFixed(2);
  count.textContent = carrito.length;
};

// Agregar producto al carrito
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const producto = e.target.closest(".producto");
    const nombre = producto.getAttribute("data-nombre");
    const precio = parseFloat(producto.getAttribute("data-precio"));
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});

// Mostrar y cerrar modal del carrito
document.getElementById("cart-btn").onclick = () => {
  document.getElementById("cart-modal").style.display = "flex";
};
document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-modal").style.display = "none";
};

// Botón hamburguesa (responsive)
const hamburgerBtn = document.getElementById("hamburger-btn");
const sidebar = document.getElementById("sidebar");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("open");
    }
  });
});

// Mostrar sección de checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
  document.getElementById("checkout-section").style.display = "block";

  // Mostrar resumen
  let suma = carrito.reduce((acc, item) => acc + item.precio, 0);
  document.getElementById("checkout-total").textContent = suma.toFixed(2);

  const checkoutItems = document.getElementById("checkout-items");
  checkoutItems.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    checkoutItems.appendChild(li);
  });

  // Scroll hacia la sección
  window.scrollTo({
    top: document.getElementById("checkout-section").offsetTop,
    behavior: "smooth"
  });
});

// Procesar formulario de compra
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("checkout-nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const metodo = document.getElementById("metodo-pago").value;

  if (!nombre || !direccion || !metodo) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert("Gracias por tu compra, " + nombre + ". ¡Tu pedido está en camino!");

  carrito = [];
  actualizarCarrito();

  document.getElementById("checkout-form").reset();
  document.getElementById("checkout-section").style.display = "none";
});

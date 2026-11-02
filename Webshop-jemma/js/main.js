import { getData, setData, loadProducts } from "./storage.js";
import { Cart } from "./cart.js";
import { updateCartCount, mobileNavToggle } from "./ui.js";

updateCartCount();
mobileNavToggle();

// ---------- data ----------

const products = await loadProducts();

// ---------- kaartjes ----------
const container = document.querySelector(".container-cards");
function createCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.categorie = product.categorie;
    card.dataset.id = product.id;

    card.innerHTML = `
        <img class="img" src="${product.afbeelding}" alt="${product.titel}">
        <div class="body-card">
            <h4>${product.titel}</h4>
            <p>${product.formattedPrice()}</p>
      <p class="${product.inStock ? 'in-stock' : 'out-of-stock'}">
    ${product.inStock ? "&#10003; op voorraad" : "niet op voorraad"}
</p>
            <div class="countdiv">
                <button class="bestel" data-id="${product.id}">bestel</button>
                <div class="counterinnerdiv">
                    <button class="btnCountplus">+</button>
                    <p class="qty">0</p>
                    <button class="btnCountmin">-</button>
                </div>
            </div>
        </div>`;
    return card;
}

function renderProducts(list) {
    container.innerHTML = "";
    list.forEach(p => container.appendChild(createCard(p)));
}

// ---------- plus / min ----------
function changeQuantity(card, delta) {
    const qtyEl = card.querySelector(".qty");
    const product = products.find(p => p.id === Number(card.dataset.id));
    const nieuw = Number(qtyEl.innerText) + delta;

    if (nieuw < 0) return;
    if (product && nieuw > product.stock) return; // niet meer dan voorraad
    qtyEl.innerText = nieuw;
}

// ---------- bestellen ----------
function addToCart(card) {
    const qtyEl = card.querySelector(".qty");
    const aantal = Number(qtyEl.innerText);
    if (aantal <= 0) return alert("Kies eerst een aantal!");

    const id = Number(card.dataset.id);
    const product = products.find(p => p.id === id);

    if (!product) return console.warn(`Product ${id} niet gevonden.`);

    const cart = Cart.fromArray(getData("cart"));

    if (product.stock < aantal) {
        return alert(`Er zijn maar ${product.stock} stuks op voorraad!`);
    }

    cart.voegToe(product, aantal);
    product.verlaagVoorraad(aantal);
    setData("products", products);
    setData("cart", cart.items);
    updateCartCount();
    qtyEl.innerText = "0";
}

// ---------- categorie ----------
function filterByCategory(categorie) {
    document.querySelectorAll(".card").forEach(card => {
        const tonen = categorie === "alles" || card.dataset.categorie === categorie;
        card.style.display = tonen ? "flex" : "none";
    });
}

// ---------- events (één plek) ----------
const btnContainer = document.querySelector(".buttonCat-container");
container.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    if (e.target.closest(".btnCountplus")) changeQuantity(card, +1);
    else if (e.target.closest(".btnCountmin")) changeQuantity(card, -1);
    else if (e.target.closest(".bestel")) addToCart(card);
});

btnContainer.addEventListener("click", (e) => {
    const knop = e.target.closest(".btn");
    if (knop) filterByCategory(knop.id);
});

// ---------- start ----------
renderProducts(products);
updateCartCount();
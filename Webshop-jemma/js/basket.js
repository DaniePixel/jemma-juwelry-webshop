// cart.js
import { getData, setData, getProducts } from "./storage.js";
import { mobileNavToggle } from "./ui.js";
import { Cart } from "./cart.js";
import { Order } from "./order.js";
mobileNavToggle();

// ---------- inhoud winkelwagen tonen ----------
const list = document.getElementById("shoppingList");
const overlay = document.getElementById("cardOverlay");
const template = document.getElementById("cart-row-template");
const totaalTemplate = document.getElementById("cart-totaal-template");
const cartheader = document.querySelector(".cart-tablehead");
function getCart() {
  const raw = getData("cart");
  return Cart.fromArray(raw);
}
function renderCart() {
  const cart = getCart();
  list.innerHTML = "";
  const shoppingcart = cart.totaalAantal;
  const countElement = document.querySelector(".cart-count");
  if (countElement) countElement.innerText = `${shoppingcart}`;

  if (cart.isLeeg) {
    cartheader.hidden = true;
    list.innerHTML = "<p>Je winkelwagen is leeg.</p>";
    return;
  }

  cart.items.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".js-titel").textContent = item.titel;
    clone.querySelector(".js-aantal").textContent = item.aantal;
    clone.querySelector(".js-prijs").textContent = item.formattedPrijs();
    clone.querySelector(".js-subtotaal").textContent = item.formattedSubtotaal();
    clone.querySelector(".js-verwijder").setAttribute("data-id", item.id);
    list.appendChild(clone);
  });

  const totaalClone = totaalTemplate.content.cloneNode(true);
  totaalClone.querySelector(".js-totaal").textContent = cart.formattedTotaal();
  list.appendChild(totaalClone);
}

// ---------- bestelknop functie bestelling plaatsen/ order aanmaken----------
const bestelBtn = document.createElement("button");
bestelBtn.textContent = "Bestellen";
bestelBtn.classList.add("btn");

bestelBtn.addEventListener("click", () => {
  const cart = getCart();
  const orders = getData("orders");
  const ordernummer = orders.length + 1;
  orders.push(new Order(ordernummer, cart.items));
  setData("orders", orders);
  setData("cart", []);
  alert("Bestelling geplaatst!");
  renderCart(); // in plaats van location.reload()
});
overlay.appendChild(bestelBtn);

// ---------- verwijder knop, verwijdert item in winkelwagen ----------
list.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".js-verwijder");
  if (!removeBtn) return;

  const itemId = Number(removeBtn.dataset.id);
  const cart = getCart();
  const item = cart.items.find((i) => i.id === itemId);   // eerst opzoeken, vóór verwijderen

  cart.verwijder(itemId);
  setData("cart", cart.items);

  const productStocking = getProducts();
  const product = productStocking.find((p) => p.id === itemId);
  if (product && item) {
    product.verhoogVoorraad(item.aantal);
  }
  setData("products", productStocking);

  renderCart();
});

// Bij het laden van de pagina: één keer renderen om te beginnen.
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
import { getData, setData, resetProducts, loadProducts, getProducts } from "./storage.js";
import { Product } from "./product.js";

import { updateCartCount, mobileNavToggle } from "./ui.js";

updateCartCount();
mobileNavToggle();

const productTemplate = document.getElementById('adminproduct-row-template').content;
// ---------- buttons producten/orders ----------
const paneelButtons = document.querySelectorAll('.tab');
const paneel = document.querySelectorAll('.paneel');
paneelButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.tab;

        paneel.forEach(p => {
            if (p.id === target) {
                p.hidden = false;
            } else {
                p.hidden = true;
            }
        });
    })
});

// ---------- Productlijst tonen ----------
const productList = document.getElementById('adminproduct-list');
let editId = null;
productList.addEventListener('click', function (e) {
    const deletebtn = e.target.closest('.delete-product');
    const editBtn = e.target.closest('.edit-product');
    const formTitel = document.getElementById('form-title');
    const formButton = document.getElementById('formbtn');
    // ---------- VERWIJDEREN ----------
    if (deletebtn) {
        const id = Number(deletebtn.dataset.id);
        const magazijn = getProducts();
        const newMagazijn = magazijn.filter(p => p.id !== id);
        setData('products', newMagazijn);
        renderProductlist();
    }
    // ---------- BEWERKEN ----------
    if (editBtn) {
        formTitel.textContent = "Product Bewerken";
        formButton.textContent = "Bewerken";
        const editForm = document.querySelector('.admin-form');
        const id = Number(editBtn.dataset.id);
        const magazijn = getProducts();
        const product = magazijn.find(p => p.id === id);
        if (!product) return;
        form.productName.value = product.titel;
        form.productPrice.value = product.prijs;
        form.categorie.value = product.categorie;
        form.afbeeldingInput.value = product.afbeelding;
        form.productStock.value = product.stock;
        editForm.scrollIntoView({ behavior: 'smooth' });
        editId = id;
    }
});
//    ----- bewerk/invoer formulier -----
const form = document.getElementById('productForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const magazijn = getProducts();
    const titel = form.productName.value;
    const prijs = Number(form.productPrice.value);
    const categorie = form.categorie.value;
    const afbeelding = form.afbeeldingInput.value;
    const stock = Number(form.productStock.value);

    if (editId !== null) {
        // --- BEWERKEN ---
        const product = magazijn.find(p => p.id === editId);
        if (product) {
            product.titel = titel;
            product.prijs = prijs;
            product.categorie = categorie;
            product.afbeelding = afbeelding;
            product.stock = stock;
        }
        editId = null; // Reset editId na het bewerken
    } else {
        // --- NIEUW PRODUCT TOEVOEGEN ---
        const ids = magazijn.map(p => p.id);
        const productId = magazijn.length ? Math.max(...ids) + 1 : 1;
        const newProduct = new Product(productId, titel, prijs, categorie, afbeelding, stock);
        magazijn.push(newProduct);
    }
    // Bewaren en herladen geldt voor zowel toevoegen als bewerken
    setData('products', magazijn);
    renderProductlist();
    form.reset(); //formulier leegmaken
});
// --- afbeelding in form ----
const input = document.getElementById('afbeeldingInput');
const preview = document.getElementById('preview');
input.addEventListener('input', function () {
    if (this.value.trim() !== '') {
        preview.src = this.value;
        preview.style.display = 'block'; // Zorgt dat hij zichtbaar wordt
    } else {
        preview.src = '';
        preview.style.display = 'none'; // Verbergt hem als het veld leeg is
    }
});
// ---- productenlijst in productenpaneel plaatsen ----
function renderProductlist() {
    const magazijn = getProducts();
    productList.innerHTML = ''; // Maak de lijst leeg voor nieuwe render
    magazijn.forEach(product => {
        const clone = productTemplate.cloneNode(true);
        clone.querySelector('.product-id').textContent = product.id;
        clone.querySelector('.product-name').textContent = product.titel;
        clone.querySelector('.product-price').textContent = product.formattedPrice();
        clone.querySelector('.product-stock').textContent = product.stock;
        clone.querySelector('.product-image').textContent = product.afbeelding;
        clone.querySelector('.edit-product').dataset.id = product.id;
        clone.querySelector('.delete-product').dataset.id = product.id;
        productList.appendChild(clone);
    })
}
// ----reset knop productenlijst ------
document.querySelector('.reset').addEventListener('click', async () => {
    await resetProducts();
    renderProductlist();
});
document.addEventListener("DOMContentLoaded", async () => {
    await loadProducts();
    renderProductlist();
});
// ---- lees orders uit en plaats in orderpaneel ----
const orderList = document.getElementById('order-list');
const orderTemplate = document.getElementById('order-row-template');
const orders = getData('orders') || [];

orderList.innerHTML = '';

orders.forEach(order => {
    order.items.forEach(item => {
        const clone = orderTemplate.content.cloneNode(true);
        clone.querySelector('.order-date').textContent = order.date;
        clone.querySelector('.product-id').textContent = item.id;
        clone.querySelector('.order-product').textContent = item.titel;
        clone.querySelector('.order-quantity').textContent = item.aantal;
        clone.querySelector('.order-nr').textContent = order.ordernr; // Voeg de order ID toe
        orderList.appendChild(clone);
    });
});



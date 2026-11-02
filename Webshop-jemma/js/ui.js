import { getData } from "./storage.js";

export function updateCartCount() {
    const cart = getData("cart") || [];
    const totaal = cart.reduce((acc, item) => acc + Number(item.aantal), 0);
    const el = document.querySelector(".cart-count");
    if (el) el.innerText = totaal;
}

export function mobileNavToggle() {
    const nav = document.querySelector('.primary-navigation-list');
    const toggle = document.querySelector('.mobile-nav-toggle');

    toggle.addEventListener('click', () => {
        const visible = nav.getAttribute('data-visible') === 'true';
        nav.setAttribute('data-visible', !visible);
        toggle.setAttribute('aria-expanded', !visible);
    });
}
// storage.js
import { Product } from "./product.js";

export function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function clearData(key) {
    localStorage.removeItem(key);
}

export function getProducts() {
    const raw = getData("products");
    return raw.map(p => Product.fromObject(p));
}

export async function loadProducts() {
    let products = getData("products");
    if (!products || products.length === 0) {
        const res = await fetch("./data/products.json");
        const raw = await res.json();
        products = raw.map(p => Product.fromObject(p));
        setData("products", products);
        return products;
    }
    return getProducts();
}

export async function resetProducts() {
    clearData('products');
    return await loadProducts();
}
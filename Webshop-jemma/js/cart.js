// cart.js
import { CartItem } from "./cartItem.js";

export class Cart {
    constructor(items = []) {
        this.items = items;
    }

    static fromArray(rawItems) {
        return new Cart(rawItems.map(i => CartItem.fromObject(i)));
    }

    get totaalAantal() {
        return this.items.reduce((acc, item) => acc + Number(item.aantal), 0);
    }

    get totaalPrijs() {
        return this.items.reduce((acc, item) => acc + item.subtotaal, 0);
    }

    get isLeeg() {
        return this.items.length === 0;
    }
    formattedTotaal() {
        return `Totaal: €${this.totaalPrijs.toFixed(2)}`;
    }
    voegToe(product, aantal) {
        const bestaand = this.items.find(item => item.id === product.id);
        if (bestaand) {
            bestaand.aantal += aantal;
        } else {
            this.items.push(new CartItem(product.id, product.titel, product.prijs, aantal));
        }
    }

    verwijder(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
}
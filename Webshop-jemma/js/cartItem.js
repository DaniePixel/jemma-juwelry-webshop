// cartItem.js
export class CartItem {
    constructor(id, titel, prijs, aantal) {
        this.id = id;
        this.titel = titel;
        this.prijs = prijs;
        this.aantal = aantal;
    }

    static fromObject(obj) {
        return new CartItem(obj.id, obj.titel, obj.prijs, obj.aantal);
    }

    get subtotaal() {
        return this.prijs * this.aantal;
    }

    formattedPrijs() {
        return `€${this.prijs.toFixed(2)}`;
    }

    formattedSubtotaal() {
        return `€${this.subtotaal.toFixed(2)}`;
    }
}
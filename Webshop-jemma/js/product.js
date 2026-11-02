export class Product {
    constructor(id, titel, prijs, categorie, afbeelding, stock) {
        this.id = id;
        this.titel = titel;
        this.prijs = prijs;
        this.categorie = categorie;
        this.afbeelding = afbeelding;
        this.stock = stock;
    }
    static fromObject(obj) {
        return new Product(obj.id, obj.titel, obj.prijs, obj.categorie, obj.afbeelding, obj.stock);
    }
    get inStock() {
        return this.stock > 0;
    }
    formattedPrice() {
        return `€${this.prijs.toFixed(2)}`;
    }
    verlaagVoorraad(aantal) {
        this.stock -= aantal;
    }
    verhoogVoorraad(aantal) {
        this.stock += aantal;
    }
}
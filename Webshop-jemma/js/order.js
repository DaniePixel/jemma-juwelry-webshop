export class Order {
    constructor(ordernr, items) {
        this.ordernr = ordernr;
        this.date = new Date().toLocaleString();
        this.items = items;
    }
    static fromObject(obj) {
        const order = new Order(obj.ordernr, obj.items);
        order.date = obj.date;
        return order;
    }
}
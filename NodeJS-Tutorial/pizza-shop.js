const EventEmitter = require('events');

class PizzaShop extends EventEmitter{
    constructor(){
        super();
        this.oderNumber = 0;
    }

    order(size, topping){
        this.oderNumber++;
        this.emit('order', size, topping);
    }

    displayOrder(){
        console.log(`Order number: ${this.oderNumber}`);
    }
}


module.exports = PizzaShop
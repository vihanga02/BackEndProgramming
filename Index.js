const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('order-pizza', (size, topping) => {
    console.log(`Pizza ordered`, size, topping);
})

emitter.emit('order-pizza', 'large', 'mushroom');
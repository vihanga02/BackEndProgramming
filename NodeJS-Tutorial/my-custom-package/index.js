// const upperCase = require('upper-case');

// function greet(name){
//     console.log(`Hello ${upperCase(name)}!`);
// }

// greet('vihanga');
// module.exports = greet;

import { upperCase } from 'upper-case';

function greet(name) {
    console.log(`Hello ${upperCase(name)}!!`);
}

greet('vihanga');

export default greet;

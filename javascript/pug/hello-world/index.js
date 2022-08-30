const pug = require('pug');

const compiledFunction = pug.compileFile('./templates/main.pug');

console.log(compiledFunction({
    name: 'John Doe',
    age: '25',
    address: '123 Main St.',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
}));


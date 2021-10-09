import { app,parse } from './preprocess.js';


const sample = `
row   # person row
    label Hello
    input id=name
row
    label Age
    input id=age
button id=submit OK
    
`;

const test_html = parse(sample);
console.log(test_html);


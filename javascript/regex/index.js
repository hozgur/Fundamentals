// regex literals

const sample_string = 'hello world! "hello world!"';

// simple regex

// iki slash arası yazılan karakterleri alır
let re1 = /hello/;

let re2 = /
console.log(re1.test(sample_string));
console.log(re1.exec(sample_string));




const regex = /^[a-zA-Z0-9]{8,}$/;

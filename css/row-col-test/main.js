
const Buffer = require("buffer").Buffer;

function person({ name = "ahmet", surname = "yılmaz", age = 25 }) {
    return `
    panel
        h1 ${name} ${surname}
        p ${age}

    `
};

function layout(content) {
    return `
    row:
         person: ahmet
         panel:
            - row:
                label: Name
                input:
            - row:
                label: Surname
                input:
    `
}

const test_yaml = `
 doe: "a deer, a female deer"
 ray: "a drop of golden sun"
 pi: 3.14159
 xmas: true
 french-hens: 3
 calling-birds:
   - huey
   - dewey
   - louie
   - fred
 xmas-fifth-day:
   calling-birds: four
   french-hens: 3
   golden-rings: 5
   partridges:
     count: 1
     location: "a pear tree"
   turtle-doves: two
   `;
function dumbString(template) {
    let buf = Buffer.from(template)
    console.log(buf);
}
function countSpaces(str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == ' ') {
            count++;
        } else {
            break;
        }
    }
    return count;
}
function parse(template,parentindent = -1) {
    const lines = template.split("\n");        
    lines.forEach(line => {
        if(line.length > 0) {
            let indent = countSpaces(line);            
            if(indent > parentindent) {
                console.log("child",line);
                parentindent = indent;
            } else
            if(indent == parentindent) {
                console.log("siblings",line);
            } else
            if(indent < parentindent) {
                console.log("end of parent",line);
                parentindent = indent;
            }
        }
    });

}


const yaml = require('js-yaml');


const doc = yaml.load(layout());
//const doc = yaml.load(test_yaml);

console.log(doc);

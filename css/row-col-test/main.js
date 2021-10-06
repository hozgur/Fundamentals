
const Buffer = require("buffer").Buffer;
const jsyaml = require("js-yaml");
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
                input: 3.14
            - row:
                label: Surname
                input: 43
    `
}


//const doc = yaml.load(test_yaml);

//console.log(doc);

const parser = require("./parser");
parser.test();
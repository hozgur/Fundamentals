const jsyaml = require("js-yaml");
html_elements = ["div","ul","li","p","a"];


function parse(element) {
    let result = "";
    const type = typeof element;
    if (type != "object") {
        result = element;
    } else if (typeof element === "object") {
        if(Array.isArray(element)){
            for(let i=0;i<element.length;i++){
                result += parse(element[i]);
            }
        } else {
        for(let key in element) {
            result += "<" + key + ">";
            result += parse(element[key]);
            result += "</" + key + ">";
        }
    }
    }
    return result;
}
function sample_layout() {
    return `
    row:
        panel:
            - row:
                label: Name m6
                input: 3.14
            - row:
                label: Surname
                input: 43
    `
}

function sample_layout2() {
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

const doc = jsyaml.load(sample_layout());

function test(){
    console.log("test");
    console.log(doc);
    let result = parse(doc);
    console.log(result);
}
module.exports = {
    parse,
    test
};
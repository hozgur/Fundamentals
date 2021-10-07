//import { dump } from "js-yaml";



const sample = `
row
    label "Hello"
    input id="name"
row
    label "Age"
    input id="age"
button id="submit"
    
`;


function process(layout) {
    const lines = layout.split('\n');
    const root = [];
    for(const line of lines) {        
        if(line.trim() == '') continue;
        const space = spaces(line);
        const props = line.trim().split(' ');
        root.push({space, props, children: []});
    }
    return root;
}


function spaces(text) {    
    for(let i = 0; i < text.length; i++)
        if(text[i] != ' ')
            return parseInt((i+2)/4);
    return 0;
}

object = process(sample);


console.log(object);
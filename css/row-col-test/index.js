import {parse} from './parser.js';


function main() {
  return `
    # Deneme
    toto: bar
       pleh: plop
       stuff: dfdfd
        
  `;
}


window.onload = function() {
    const data = parse(main());
    console.log(data);
    document.body.innerHTML = data;
};


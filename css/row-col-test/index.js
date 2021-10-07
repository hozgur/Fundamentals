import { parse } from './parser.js';


function main() {
    return `
    # Deneme
panel:
    - row:
      panel:
        - label: "Deneme"
        - label: "Deneme2"
    - row:
        panel:
            label: "Deneme"
  `;
}


window.onload = function () {
    const data = parse(main());
    console.log(data);
    document.body.innerHTML = data;
};


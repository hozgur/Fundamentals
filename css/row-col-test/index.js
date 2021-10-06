import {parse} from './parser.js';


function main() {
  return `
    row:
        - panel:
            - row:
                label: İsim m4
                input: "name"
            - row:
                label: Soyisim m4
                input: "surname"
        - panel:
                - row:
                    label: İsim m4
                    input: "name"
                - row:
                    label: "Soy_İsim m4"
                    input: surname text hakan
    panel:
        - row:
            - label: "Deneme2: m4"
            - input: "name2"
            - label: Deneme3 m4
            - input: "name3"
            - label: Deneme4 m4
            - input: "name4"
        - row:
            - label: Deneme2 m4
            - input: "name2"
            - label: Deneme3 m4
            - input: "name3"
            - label: Deneme4 m4
            - input: "name4"


  `;
}

window.onload = function() {
    const data = parse(main());
    console.log(data);
    document.body.innerHTML = data;
};


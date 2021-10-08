import { parse } from './preprocess.js';


function main() {
    return `
    row
        panel
            row
                label Hello World m6
                input id=name
                button Click_me m6
            row
                label Hello World m6
                input id=name
                button Click_me m6
        panel
            row
                label Hello World m6
                input id=name
                button Click_me m6
            row
                label Hello World m6
                input id=name
                button Click_me m6
    row
                panel
                    row
                        label Hello World m6
                        input id=name
                        button Click_me m6
                    row
                        label Hello World m6
                        input id=name
                        button Click_me m6
                panel
                    row
                        label Hello World m6
                        input id=name
                        button Click_me m6
                    row
                        label Hello World m6
                        input id=name
                        button Click_me m6
  `;
}


window.onload = function () {
    const data = parse(main());
    console.log(data);
    document.body.innerHTML = data;
};


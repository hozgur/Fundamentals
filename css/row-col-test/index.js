import { dialog } from './preprocess.js';


const layout = `
    panel
        row
            label Name m6
            input id=name class="form"
        row
            label Surname m6
            input id=surname
            label Age m6
            input id=age
    button id=try_me Try_Me onClick=app.test2()
  `;

const app = new dialog();
window.app = app;
app.test2 = function() {
    app.setVal("name", "John");
    app.setContent("try_me", "Ok!");
};


window.onload = function () {
 app.init(layout, "myapp");

    // document.getElementById("try_me").onclick = function () {
    //     let name = document.getElementById("name").value;
    //     let surname = document.getElementById("surname").value;
    //     let age = document.getElementById("age").value;
    //     alert(`Hello ${name} ${surname}, you are ${age} years old`);
    // }
};

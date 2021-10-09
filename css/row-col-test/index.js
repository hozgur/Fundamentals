import { dialog } from './preprocess.js';


const layout = `
    panel
        row
            panel
                list m10
                    list-item id=list-1
                        a Deneme1 href=#1
                        i class=fas+fa-angle-right+p2
                    list-item id=list-2
                        a Seçenek_2 href=#2 
                        i class=fas+fa-angle-right+p2
                    list-item id=list-3
                        a Seçenek_3 href=#3 
                        i class=fas+fa-angle-right+p2
                p id=list-footer
            panel
                row
                    label Name_: m6
                    input id=name class=item
                row
                    label Surname_: m6
                    input id=surname
                row
                    label Age_: m6
                    input id=age m2
                    button id=inc  onClick=app.increase(1)
                        i class=fas+fa-plus
                    button id=dec  onClick=app.increase(-1)
                        i class=fas+fa-minus

    row class=right
        button id=try_me Try_Me onClick=app.setData()
            i class=fas+fa-check+p2
        button id=clear Clear onClick=app.clear()
            i class=fas+fa-trash+p2
        button id=open toggle onClick=app.toggle()
    row class=border
        button id=left
            i class=fas+fa-arrow-left
        button id=right
            i class=fas+fa-arrow-right
        button id=up
            i class=fas+fa-arrow-up
        button id=down
            i class=fas+fa-arrow-down
  `;

const app = new dialog();
window.app = app;
app.setData = function() {
    app.set(
        {
            name: "John",
            surname: "Doe",
            age: "25"
        });
    
    app.setContent("try_me", "Ok!");
};

app.clear = function() {
    app.set({
        name: "",
        surname: "",
        age: ""
    });
    app.setContent("try_me", "Try Me");
};

app.increase = function(dx) {
    app.set({
        age: parseInt(app.get({age:0}).age) + parseInt(dx)
    });
};

app.toggle = function() {
    app.classList("left").toggle("rotate");
};

app.select = function(event) {
    console.log(event.target.id);
    app.setContent("list-footer", "Seçilen: " + event.target.id);
    app.classList(event.target.id).toggle("selected");
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

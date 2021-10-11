import { dialog } from './preprocess.js';


const layout = `
    panel
        row
            panel id=left
                list id=mylist m12
                    list-item
                        p id=name Hello
                        i id=icon class=fas+fa-angle-right+p2                    
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
        button id=open Set_Array onClick=app.array_test()
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

app.array_test = function() {
    app.set({
        mylist: [
            {
                "list-1": "Seçenek_1"                
            },
            {
                "list-2": "Seçenek_2"
            },
            {
                "list-3": "Seçenek_3"
            }
        ]
    });       
};

app.select = function(event,id) {
    app.setContent("list-footer", "Seçilen: " + id);
    app.classList(id).toggle("selected");
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

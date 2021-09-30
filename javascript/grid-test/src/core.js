window.addEventListener('load', function() {
    console.log('window loaded');
});

var app = document.getElementById('app');

export class Dialog {
    constructor({id = 'dlg', title = 'My Dialog', content = '', buttons = []}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.buttons = buttons;        
        this.element = document.createElement('div');
        app.appendChild(this.element);
        this.element.classList.add('dialog');
        this.element.id = this.id;

        if(this.title) {
            this.element.appendChild(this.createHeader());
        }            
    }

    createHeader() {
        var header = document.createElement('div');
        header.classList.add('dialog-header');
        header.innerHTML = `<span>${this.title}</span>`;
        return header;
    }
}

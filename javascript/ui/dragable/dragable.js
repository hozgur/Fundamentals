class dragable {
    constructor(parent,id,content) {
        const container = document.getElementsByClassName(parent);
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = 'dragable';
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '0';
        this.element.onmousedown = this.dragStart.bind(this);
        this.oldx = 0;
        this.oldy = 0;
        this.element.innerHTML = content;
        container[0].appendChild(this.element);
    }

    dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.oldx  = e.clientX;
        this.oldy  = e.clientY;
        document.onmouseup = this.dragEnd.bind(this);
        // call a function whenever the cursor moves:
        document.onmousemove = this.drag.bind(this);
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '1';
        
    }
    dragEnd() {
        document.onmouseup = null;
        document.onmousemove = null;
        //this.element.style.position = 'static';
        this.element.style.zIndex = '0';
    }
    drag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        const x = this.oldx - e.clientX;
        const y = this.oldy - e.clientY;
        this.oldx = e.clientX;
        this.oldy = e.clientY;
        // set the element's new position:
        this.element.style.top = (this.element.offsetTop - y) + "px";
        this.element.style.left = (this.element.offsetLeft - x) + "px";
      }
}
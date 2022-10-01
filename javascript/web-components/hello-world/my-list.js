class myList extends HTMLElement {
    #data = [
    ]

    static get observedAttributes() {
      return [
        'data'        
      ]
    }

    constructor() {
        super()        
        }
    
    connectedCallback() {        
        this.render()
    }
    get html() {
        return `
        <style>
        .my-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100%;
            background-color: #fff;
            color: #000;
            font-family: sans-serif;
            font-size: 1.5rem;
            font-weight: 300;
            text-align: center;
            padding: 0.5rem;
            box-sizing: border-box;
        }
        .my-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .my-list li {
            margin: 0.5rem 0;
        }
        .my-list li button {
            background-color: #fff;
            border: 1px solid #000;
            border-radius: 0.25rem;
            color: #000;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 300;
            width: 100%;
            padding: 0.5rem 1rem;
        }
        .my-list li button:hover {
            background-color: #000;
            color: #fff;
        }
        .my-list li button:active {
            background-color: #000;
            color: #fff;
        }
        </style>
        <div class="my-list">
            <ul>
                ${this.#data.map(item => `
                    <li>
                        <button>${item}</button>
                    </li>
                `).join('')}
            </ul>
        </div>
        `
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data') {
            this.#data = JSON.parse(newValue)
            this.render()
        }
    }
            

    render()   {        
        this.innerHTML = this.html
    }
}
window.customElements.define('my-list', myList)
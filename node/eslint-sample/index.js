class Myclass {
    constructor() {
        this.name = "Myclass";
    }
    sayHello() {
        console.log(`Hello ${this.name}`);
    }

    static sayHelloStatic() {
        console.log("Hello static");
    }
}


let myclass = new Myclass();
myclass.sayHello();
Myclass.sayHelloStatic();




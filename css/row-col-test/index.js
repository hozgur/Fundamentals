function person_panel({id="name", name="", age=0}) {
    return `
panel
panel
    panel
        row,${name}
            label "İsim"
            input id="name" value="name" events="change"
        row
            label "Soyisim"
            input id="surname" value="surname"
`};


const layout = `
row
    person-panel
    panel
`;
console.log(person_panel({name:"hakan"}));
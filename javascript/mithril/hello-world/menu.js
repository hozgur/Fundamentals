
export function menu_items() {
    return [{
        text: 'Menu Item 1'
    },{
        text: 'Menu Item 2'
    }]
}

export default function menu() {
    return {
        view: function() {
            return m(".row", menu_items().map(item => {
                return m(".panel", item.text)}))}};
}

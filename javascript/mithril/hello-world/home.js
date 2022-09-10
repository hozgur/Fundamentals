import menu from './menu.js'
import header from './header.js'
export default function home() {
    return {
        view: function() {
            return [m(header, "Home Page"),
                    m(menu)]}
            }
        }

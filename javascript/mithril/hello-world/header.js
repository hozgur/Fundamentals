
export default function header() {
    return {
        view: function() {
            return m("header", [
                m(".header", [
                    m("nav", [
                    m("a", {href: "#!/home"}, "Rotary Tool"),
                    m("a", {href: "#!/home"}, "Home")
                ]),
                m("nav.right", [
                    m("a", {href: "#!/settings"}, "Settings")
                ])
            ])
            ])
        }
    }
}
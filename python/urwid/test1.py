import urwid

def exit_program(button):
    raise urwid.ExitMainLoop()

menu = urwid.Text(["File   ", "Edit   ", "Help"])
content = urwid.Filler(urwid.Text("Content Area", align='center'), 'middle')
status_bar = urwid.Text("Status: Everything is A-OK!")
exit_button = urwid.Button("Exit", on_press=exit_program)
pile = urwid.Pile([menu, content, status_bar, exit_button])

fill = urwid.Filler(pile, 'middle')

# Create a console screen
screen = urwid.ConsoleScreen()

loop = urwid.MainLoop(fill, screen=screen)
loop.run()

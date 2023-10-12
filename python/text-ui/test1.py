import npyscreen

class MyApp(npyscreen.NPSAppManaged):
    def onStart(self):
        self.addForm('MAIN', MainAppForm, name="Text-based GUI")

class MainAppForm(npyscreen.Form):
    def create(self):
        # Menu at the top with a maximum height
        self.menu = self.add(MenuWidget, name="Menu:", values=["File", "Edit", "Help", "Exit"], max_height=5)
        
        # Content Area in the middle
        self.content = self.add(npyscreen.BoxTitle, name="Content Area", max_height=10)
        
        # Status bar at the bottom
        self.status = self.add(npyscreen.TitleText, name="Status:", value="Everything is A-OK!")

class MenuWidget(npyscreen.SelectOne):
    def when_value_edited(self):
        selected_objects = self.get_selected_objects()
        if not selected_objects:
            return
        
        selected_option = selected_objects[0]
        if selected_option == "Exit":
            self.parent.parentApp.setNextForm(None)
            self.editing = False

if __name__ == "__main__":
    app = MyApp()
    app.run()

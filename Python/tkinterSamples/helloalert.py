import tkinter
# from some reason with tkinter, message box doesn't get imported.
# so manually importing the message module
import tkinter.messagebox

class Insomniac: 
    # Class constructor. Whenever an instance of this class is created, 
    # this method is called. self is this pointer that can be accessed
    # inside this class to access its own members. 
    # This is very Javascript like format. It needs self for every data member
    # its creating.
    def __init__(self, window):
        self.button = tkinter.Button(window, text="Click me", fg="orange", command=self.show_alert).pack(fill="x")

    # Callback for the button
    def show_alert(event): 
        tkinter.messagebox.showinfo("Alert Message", "This is just a alert message!")

window = tkinter.Tk()
window.title("Encrypted Squares")
insomniac = Insomniac(window)
window.mainloop()
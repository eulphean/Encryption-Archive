import tkinter

class Insomniac: 
    # Class constructor. Whenever an instance of this class is created, 
    # this method is called. self is this pointer that can be accessed
    # inside this class to access its own members. 
    # This is very Javascript like format. It needs self for every data member
    # its creating.
    def __init__(self, window):
        self.button = tkinter.Button(window, text="Click me", fg="black", command=self.say_hi).grid(row=0)
        self.input = tkinter.Entry(window).grid(row=0, column=1)
        self.label = tkinter.Label(window, text="Hi", fg="white", bg="black").grid(row=1, column=0)
        self.output = tkinter.Entry(window).grid(row=1, column=1)

    # Callback for the button
    def say_hi(): 
        print('Hello Amay')


window = tkinter.Tk()
window.title("Encrypted Squares")
insomniac = Insomniac(window)
window.mainloop()

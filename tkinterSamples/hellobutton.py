import tkinter

window = tkinter.Tk()
window.title("Encrypted Squares")

# Callback method for the button. 
def say_hi(event): 
    print('Hello Amay')


# Button doesn't support background on Macs
# Also button clicks are missing in Macs. It just
# clicks and fires an event. 

# Event binding *<Button-1>* is the left click event.
# Or use command=say_hi for binding the callback to the button
button = tkinter.Button(window, text="Click me", fg="black")
button.bind("<Button-1>", say_hi)
button.grid(row="0")

input = tkinter.Entry(window).grid(row=0, column=1)
label = tkinter.Label(window, text="Hi", fg="white", bg="black").grid(row=1, column=0)
output = tkinter.Entry(window).grid(row=1, column=1)

window.mainloop()
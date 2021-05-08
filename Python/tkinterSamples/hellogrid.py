import tkinter

window = tkinter.Tk()
window.title("Encrypted Squares")

# Add widgets to the frame
label = tkinter.Label(window, text= "Hello I am a label", fg="white", bg="black").grid(columnspan=10) # row = 0 column = 0
input = tkinter.Entry(window).grid(rowspan=10)

window.mainloop()
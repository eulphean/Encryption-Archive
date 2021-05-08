import tkinter
window = tkinter.Tk()
window.title("Encrypted Squares")

result = tkinter.PhotoImage(file = "ResultImage3.png")
label = tkinter.Label(window, image=result).pack()

window.mainloop()
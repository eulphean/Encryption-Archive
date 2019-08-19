import tkinter

window = tkinter.Tk()
window.title("Encrypted Squares")

# Create a top/bottom frame where widgets will be placed. 
top_frame = tkinter.Frame(window).pack()
bottom_frame = tkinter.Frame(window).pack(side = "bottom")

# Add widgets to the frame
label = tkinter.Label(window, text= "Hello I am a label", fg="white", bg="black").pack(fill="x")
btn0 = tkinter.Button(window, text="I should Exapd", fg="purple").pack(fill="x")
btn1 = tkinter.Button(top_frame, text = "Button1", fg = "red").pack(fill="x")# 'fg - foreground' is used to color the contents
btn3 = tkinter.Button(bottom_frame, text = "Button2", fg = "purple").pack(fill = "y")# 'side' is used to align the widgets
# btn4 = tkinter.Button(bottom_frame, text = "Button2", fg = "orange").pack(side = "right")
window.mainloop()
# Use tkinter.<widget_name> format to include any specific widget you want. 

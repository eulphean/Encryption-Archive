# EncryptedSquares
This repository contains the work for Dylan's project in Hangzhou, China. 

Steps to Install Python's virtual environment. This project will be completely developed with Python3, so here are some guidelines on how to step up the virtual environment for that and the packages we need. These are steps for MacOSx. There maybe different steps for Raspberry Pi. In o

1: Install Python3 (By default Mac comes with python2 because of its dependencies)
2: Setup a virtual environment to develop with Python3
Here are the steps for that
a: mkdir ~/.virtualenvs
b: python3 -m venv ~/.virtualenvs/myvenv
c: source ~/.virtualenvs/myvenv/bin/activate
Now, I should be inside my python3 environment. If I type python, it should evoke python3
3: To see all the packages installed here, do pip list. There shouldn't be many packages here. 

Packages required for this project. 
sudo pip install pycrypto, pip list (to ensure it installed) => For Encrypto.py
sudo pip install Pillow, pip list (to ensure it installed) => For Decrypt.py

Tkinter comes installed by default with python. I will be using this library to develop the User interface for this project. 
Nice tutorial for tkinter that I'll be using to develop this application. 
https://www.datacamp.com/community/tutorials/gui-tkinter-python

Python 3.7.4 Official Documentation
https://docs.python.org/3/


Things to add in the GUI
1: Text box
2: Encryption key
3: Encrypted binary
4: Image
5: Button
6: Title

Create a sketch document. 
# Encryption Archive
For 2019 HangZhou Bienniel, Montreal based visual artist [Dylan Fish](https://www.unlocklockport.com/dylan-fish) commissioned Amay Kataria to create [Encryption Archive](https://encryptionarchive.art). This project is divided into three components: 

**1:** Interactive web-application: On the web-application users can type a message. On clicking submit, the message is encrypted and the user is shown an encrypted pattern that is translated from binary to a visual language on the screen. The message is then transmitted to a central webserver, where it is stored in a database for future reference.

**2:** Central backend: This central webserver hosts the database, which stores all the messages received through from the web-application. Additionally, a visual system is created where one can access the database and filter these encrypted messages as per date into an image, which can be used to produce a collated fabric weaving.

**3:** 2: Printer backend: During the exhibition, along with the interactive web-application there is also a receipt printer that is installed in the space. This is powered by another local server that receives the encrypted messages that are created on the website. On receiving these messages, the receipt printer creates a printout for the user with the date, time, and the encrypted visual output of the message. 

This work is developed using open-source libraries like [React.js](https://reactjs.org/) and [Node.js](https://nodejs.org/en/).

![EA](https://user-images.githubusercontent.com/4178424/145728080-4db27405-75e9-4322-ae96-d1a89237c8c3.PNG)

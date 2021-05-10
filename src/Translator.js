class Translator {
    constructor() {
        // Main page
        this.title = select('.title');
        this.about = select('.about');
        this.private = select('.pkey');
        this.textInput = select('.textinput'); 
        this.submit = select('.inputbutton');

        // About page.
        this.modalProject = select('.project');
        this.modalText = select('.modalText');
        this.modalPeople = select('.people');

        // Individual people
        this.dylanTitle = select('.dylan');
        this.dylanContent = select('.dylanContent');

        this.danielTitle = select('.daniel');
        this.danielContent = select('.danielContent');

        this.amayTitle = select('.amay');
        this.amayContent = select('.amayContent');

        this.stefanTitle = select('.stefan');
        this.stefanContent = select('.stefanContent');

        this.englishBtn = select('.eng');
        this.chineseBtn = select('.cn');

        this.closeButton = select('.tingle-btn');
    }

    translateEnglish() {
        this.title.html('Encryption Archive');
        this.about.html('About');
        this.private.html('Private Key |');
        this.submit.html('SUBMIT');
        this.textInput.attribute('placeholder', 'Type Something...');

        this.modalProject.html('About');
        this.modalText.html(' This website has been designed to encode and encrypt messages into a file format that will be woven into cloth.  The message you submit through this website will be stored in its encrypted format in our database until it is ultimately woven into one collective textile with all the messages submitted over the course of this exhibition.  As a token of our gratitude for your contribution, you will be provided with a paper copy of your encrypted message along with its decryption key through the receipt printer on display here in the museum.<br /><br />Encrypted_Archive_03.fff is a fabric file format that contains 19 discrete digital files.  These digital files have been encoded into binary, encrypted and woven into the 50 yard cloth presently on display.  Each of the 19 files embedded in this cloth has a unique private key number that is necessary to decrypt and open the original file.  These private key numbers exist as morse code in the flashing neon lights.<br /><br />The .fff file format reimagines how digital files might be stored in plain sight through analog technology using the binary nature of weaving as a means of storing data inside the structures of a cloth.  These fabric files can hold texts, images, audio, video, or any other digital file format.  Such files could be used to transfer information across borders, storing data over time in a manner that is not readily available through digital means. This project questions the importance of privacy and the function of encryption in today’s Orwellian reality of digital surveillance, as well as how and why we store our data.');
        this.modalPeople.html('PEOPLE');

        this.dylanTitle.html('Dylan Fish');
        this.dylanContent.html(' (born 1991, St. Catharines, Canada) is a Chicago-based artist and an alumni of the School of the Art Institute of Chicago, where he received his Masters in Fine Arts from the Fiber and Material Studies department on a full merit scholarship.  He has received grants from the province of Nova Scotia, the School of the Art Institute of Chicago’s Shapiro Center for Research and Collaboration and the University of Chicago’s Arts, Science and Culture Initiative.');

        this.danielTitle.html('Daniel Johnstone');
        this.danielContent.html(' (born 1989, Toronto, Canada) holds a PhD from the University of Chicago in pure Mathematics. He works in the fields of Number Theory and Representation Theory where he strives to better understand various arithmetic and geometric structures with a view towards furthering what is known as the Langlands Program.');

        this.amayTitle.html('Amay Kataria');
        this.amayContent.html(' (born 1990, New Delhi, India) graduated from the School of the Art Institute of Chicago (2019) with an MFA in Art & Technology Studies. After completing his bachelors in Computer Engineering from Virginia Tech (2012), he worked for Microsoft Corp. (2013-2017) in Seattle, WA. He has been invited as a visiting artist at the Ethereal Summit, ThoughtWorks and Bellas Artes Outpost and was awarded the New Media Art Residency at Art Center Nabi.');

        this.stefanTitle.html('Stefan Glowacki');
        this.stefanContent.html(' (born 1994, Poznan, Poland) holds a Bachelors of Fine Arts from the School of the Art Institute of Chicago, where he focused on film, video, new media and animation.');

        this.englishBtn.addClass('currentLang');
        this.chineseBtn.removeClass('currentLang');

        this.closeButton.html('CLOSE');
    }

    translateChinese() {
        // Main page
        this.title.html('Chinese Title');
        this.about.html('Chinese About');
        this.private.html('Chinese Private');
        this.submit.html('Chinese Submit');
        this.textInput.attribute('placeholder', 'Chinese Placeholder');

        // About page
        this.modalProject.html('Chinese About');
        this.modalText.html('Chinese Text');
        this.modalPeople.html('Chinese People');

        this.dylanTitle.html('Chinese Dylan');
        this.dylanContent.html(' Chinese Dyland Content');

        this.danielTitle.html('Chinese Daniel');
        this.danielContent.html(' Chinese Danier Content');

        this.amayTitle.html('Chinese Amay');
        this.amayContent.html(' Chinese Amay Content');

        this.stefanTitle.html('Chinese Stefan');
        this.stefanContent.html(' Chinese Stefan Content');
        
        this.englishBtn.removeClass('currentLang');
        this.chineseBtn.addClass('currentLang');

        this.closeButton.html('Chinese Close');
    }
}   

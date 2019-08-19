class Encrypter {
    constructor() {
        // List of characters we will use to create a key
        this.charList = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
    }

    getKey() {
        // Get 16 random characters from charList and create a string. 
        var key = '';
        for (var i = 0; i < 16; i++) {
            // Gets a random element from this array and appends it to the key. 
            key += _.sample(this.charList); 
        }
       
        return key; 
    }

    encrypt(message) {
        var key = this.getKey(); 
        var encrypted = CryptoJS.AES.encrypt(message, key, { mode: CryptoJS.mode.CFB }); 

        var encryptedString = encrypted.toString(); 
        var encryptedBinary = this.getBinary(encryptedString); 

        // Return object with the encrypted outputs
        var output = {
            'char' : encryptedString, 
            'binary' : encryptedBinary
        }; 

        return output; 
    }

    getBinary(encryptedMsg) {
        var bin = '';  
        _.each(encryptedMsg, (s) => {
            bin += s.charCodeAt().toString(2); 
        }); 
        return bin; 
    }
}
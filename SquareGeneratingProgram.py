import binascii
from Crypto.Cipher import AES
from Crypto import Random
from Crypto.Random import random

def stringtobinary(string):
    binstring = ''.join(format(ord(x),'b') for x in string)
    return binstring
#this is a technical matter which will be relevant; this function takes a string and turns it into 0's and 1's

letterset = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0']
#just a list of characters from which to generate a key


key = ''.join(random.choice(letterset) for x in range(0,16))
#the key is the `key' (ha!) to making AES work

iv = Random.new().read(AES.block_size)
#it's standard to add some initial value (iv) at the beginning of the encryption

cipher = AES.new(key, AES.MODE_CFB, iv)
#this builds the gadget which encrypts our stuff

plaintext = 'boomboomboomboomIwantyouinmyroomtospendthenighttogetherfromnowuntilforever'
#plaintext is our test message to encrypt

ciphertext = iv + cipher.encrypt(plaintext)
#ciphertext is the encrypted message
#we start with the iv and then toss in the message to be encypted; cipher.encrypt does this for us


#uncomment the following to look at what these test messages look like
#print stringtobinary(plaintext)
#print stringtobinary(ciphertext)


###
# The real deal
###

FarsiMsgFile = open('Message_Test.txt', 'rb').read()
FarsiMsgEncrypted = iv + cipher.encrypt(FarsiMsgFile)
FarsiMsgBinary = bin(int(binascii.hexlify(FarsiMsgEncrypted), 16))[2:]
#this opens the png file, converts it to 0's and 1's, and encrpyts it.

myfile = open("Message_Test.txt", "w+")
myfile.write(FarsiMsgBinary)
myfile.close()
#this generates a text file of the encrypted message


alsomyfile = open("Message_Test.txt", "w+")
alsomyfile.write(key)
alsomyfile.close()
#this generates a text file containing the key






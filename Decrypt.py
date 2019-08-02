from PIL import Image, ImageDraw
import math

#width = 1760
#this is the parameter you change to change the width

onesandzerosfile = open("Message_Binary.txt", "r")
onesandzeros = onesandzerosfile.read()
onesandzerosfile.close()

def makelonggarbagestring(width):
    crap = ""
    for x in range(0,int(width/2)):
        crap = crap+"01"
    return crap

def corlength(string, width):
    stringlength = len(string)
    L = int(math.ceil(stringlength/width))
    newstring1 = string+makelonggarbagestring(width)
    newstring2 = newstring1[:L*width]
    return newstring2

def garbageparitystring(width,parity):
    crap = ""
    for x in range(0,int(width/2)):
        if int(math.fmod(parity,2))==0: crap = crap+"01"
        if int(math.fmod(parity,2))==1: crap = crap+"10"
    return crap
#print(garbageparitystring(10,1))
#print(garbageparitystring(10,2))

def longgarbage(width):
    initial = ""
    even = garbageparitystring(width,0)
    odd = garbageparitystring(width,1)
    for x in range(0,400):
        if int(math.fmod(x,2))==0: initial = initial+even
        if int(math.fmod(x,2))==1: initial = initial+odd
    return initial

def padstring(string,width):
    return longgarbage(width)+string+longgarbage(width)

#print("hello"+longgarbage(20))

def breakintochunks(string, width):
    goodstring = padstring(corlength(string, width),width)
    stringlength = len(goodstring)
    L = int(math.ceil(stringlength/width))
    #newstring1 = string+makelonggarbagestring(width)
    #newstring2 = newstring1[:L*width]
    chunks = []
    for x in range(0,L):
        chunks.append(goodstring[x*width:(x+1)*width])
    #prelast = newstring2[(L-1)*width:L*width]+makelonggarbagestring(width)
    #last = prelast[:width]
    #chunks.append(last)
    return [L,chunks]
#this does the grunt work of breaking our super long string into managable pieces                

#print(str(int(math.fmod(7,2))))

prepretest = breakintochunks(onesandzeros,1760)
pretest = prepretest[1]
test = pretest[187]
#print(test)
#print(str(len(test)))

#print(makelonggarbagestring(24))

#actual length is EIGHT WIDER than input because of padding
def makeimagefile(string, width):
    listobject = breakintochunks(string, width)
    L = listobject[0]
    listofbins = listobject[1]
    #print(str(len(listofbins)))
    output = Image.new('1',(width+8,L))
    draw = ImageDraw.Draw(output)
    for y in range(0,L):
        locallist = listofbins[y]
        y0 = int(math.fmod(y,2))
        y1 = int(math.fmod(y+1,2))
        draw.point((0,y),y0)
        draw.point((1,y),y1)
        draw.point((2,y),y0)
        draw.point((3,y),y1)
        draw.point((width+4,y),y0)
        draw.point((width+5,y),y1)
        draw.point((width+6,y),y0)
        draw.point((width+7,y),y1)
        for x in range(0,width):
            color = int(locallist[x])
            draw.point((x+4,y),color)
    #lastlist = listofbins[L-1]
    #this last step is weird since the final chunk of list may be shorter than width
    #for x in range(0,len(lastlist)):
    #    color = int(lastlist[x])
    #    draw.point((x,L-1),color)
    output.save("ResultImage.png", 'PNG')
    print("Done")

makeimagefile(onesandzeros, 700)
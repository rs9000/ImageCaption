import PIL
import os, sys
from PIL import Image

basewidth = 400
for file in os.listdir("img"):
	img = Image.open('img/' + file)
	wpercent = (basewidth/float(img.size[0]))
	hsize = int((float(img.size[1])*float(wpercent)))
	img = img.resize((basewidth,hsize), PIL.Image.ANTIALIAS)
	img.save('img/caption.jpg')
	os.remove("img/" + file)




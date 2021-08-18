import os
fileNames = os.listdir("./")
for name in fileNames:
    os.rename(name,name[:-3]+"jpg")
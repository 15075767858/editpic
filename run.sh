#!/bin/bash
cd /Library/WebServer/Documents/editpic/
rm -rf /Library/WebServer/Documents/editpic/build/production
sencha app build
rm -rf /Library/WebServer/Documents/editpic/build/production/graph/resources/font-awesome
rm -rf /Library/WebServer/Documents/editpic/build/production/graph/resources/fonts
rm -rf /Library/WebServer/Documents/editpic/build/production/graph/modern
cd /Library/WebServer/Documents/editpic/build/production
mkdir autoInstallPackage
tar czvf graph.tar.bz2 graph/
split -b 1m graph.tar.bz2 autoInstallPackage/autoInstallGraph.
tar czvf autoInstallPackage.tar.bz2 autoInstallPackage
cd /Library/WebServer/Documents/editpic/build/production
sudo find /Library/WebServer/Documents/editpic/ -name .DS_Store -depth -exec rm {} \;
#rm -rf autoInstallPackage/
#open .
#cd /Library/WebServer/Documents/editpic/build/production
#ftp -n<<!
#open 192.168.253.253
#user
#binary
#ls
#cd web_arm/www/
#ls
#put graph.tar.bz2
#tar -xzvf graph.tar.bz2
#close
#bye
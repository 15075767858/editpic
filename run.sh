#!/bin/bash
cd /Library/WebServer/Documents/graph/
rm -rf /Library/WebServer/Documents/graph/build/production
sencha app build
rm -rf /Library/WebServer/Documents/graph/build/production/graph/resources/font-awesome
rm -rf /Library/WebServer/Documents/graph/build/production/graph/resources/fonts
rm -rf /Library/WebServer/Documents/graph/build/production/graph/modern
cd /Library/WebServer/Documents/graph/build/production
mkdir autoInstallPackage
tar czvf graph.tar.bz2 graph/
rm -rf /Library/WebServer/Documents/graph/build/production/graph/resources/SvgHvac
tar czvf autoGraph.tar.bz2 graph/


#split -b 1m graph.tar.bz2 autoInstallPackage/autoInstallGraph.
#tar czvf autoInstallPackage.tar.bz2 autoInstallPackage


#cd /Library/WebServer/Documents/graph/build/production
#sudo find /Library/WebServer/Documents/graph/ -name .DS_Store -depth -exec rm {} \;
#rm -rf autoInstallPackage/
#open .

cd /Library/WebServer/Documents/graph/
sh ftpUpload.sh
sh telnetTar.sh
#!/bin/bash
rm -rf build/production
/Users/liuzhencai/bin/Sencha/Cmd/6.1.3.42/sencha app build
rm -rf build/production/graph/resources/font-awesome
rm -rf build/production/graph/resources/fonts
rm -rf build/production/graph/modern
cd build/production
mkdir autoInstallPackage
tar czvf graph.tar.bz2 graph/
rm -rf graph/resources/SvgHvac
tar czvf autoGraph.tar.bz2 graph/


#split -b 1m graph.tar.bz2 autoInstallPackage/autoInstallGraph.
#tar czvf autoInstallPackage.tar.bz2 autoInstallPackage


#cd /Library/WebServer/Documents/graph/build/production
#sudo find /Library/WebServer/Documents/graph/ -name .DS_Store -depth -exec rm {} \;
#rm -rf autoInstallPackage/
#open .

cd /Applications/MAMP/htdocs/graph/
sh ftpUpload.sh
sh telnetTar.sh
/Users/liuzhencai/bin/Sencha/Cmd/6.1.3.42/sencha app build testing

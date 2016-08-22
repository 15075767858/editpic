#!/bin/bash
cd /mnt/nandflash/web_arm/www/graph/resources/upload/
cat  autoInstallGraph*  > install 
tar -xzvf install -C /mnt/nandflash/web_arm/www/
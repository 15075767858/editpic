#!/usr/bin/env bash
cd /Library/WebServer/Documents/graph/build/production
ftp  -n<<!
open 192.168.253.253
user
binary
ls
cd web_arm/www/
ls
put graph.tar.bz2
close
bye

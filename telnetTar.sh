#!/usr/bin/env bash

(sleep 5;
 echo "root";
 sleep 5;
 echo "admin10000bas";
 sleep 5;
 echo "cd  /mnt/nandflash/web_arm/www/";
 sleep 2;
 echo "tar -xzvf ./graph.tar.bz2"
 sleep 60;
  echo exit
)|telnet 192.168.253.253





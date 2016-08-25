#!/usr/bin/env bash

(sleep 1;
 echo "root";
 sleep 1;
 echo "admin10000bas";
 sleep 1;
 echo "cd  /mnt/nandflash/web_arm/www/";
 sleep 1;
 echo "tar -xzvf ./graph.tar.bz2"
 sleep 60;
  echo exit
)|telnet 192.168.253.253
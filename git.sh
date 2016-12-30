#!/usr/bin/env bash
read -p "input a val:"  val
echo $val
git add .
git commit -m $val
sh run.sh

git push origin master

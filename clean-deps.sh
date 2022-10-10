#!/bin/bash
# Remove installed modules
rm -rf node_modules
# Remove yarn meta files
yarnLogToDeletion="yarn.lock"
# Remove npm meta files
npmLogToDeletion="package-lock.json"
# Delete if exist yarn meta-info packages
if [ -f $yarnLogToDeletion ] ; then
    rm $yarnLogToDeletion
fi
# Delete if exist npm meta-info packages
if [ -f $npmLogToDeletion ] ; then
    rm $npmLogToDeletion
fi
# Install only fresh copies
npm cache clean --force
#Get installation
npm i --legacy-peer-deps



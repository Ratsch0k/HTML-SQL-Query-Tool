#!/bin/sh
REP_URL="git@github.com:Ratsch0k/HTML-SQL-Query-Tool.git"
DEST_PATH=/var/www/html

# Save current path
CUR_PATH=$(echo $PWD)

# Check if temporary directrory already exists and delete if it does
if [ -d tmp ] 
then
  rm -rf tmp
fi

# Create new empty directory to clone repository
mkdir tmp

# Clone deploy branch of repository into temp
git clone -b deploy $REP_URL tmp

#Change into repository
cd tmp

# Install dependencies and build
npm install
npm run build

# Copy build project into new folder
cd ..
if [ -d $DEST_PATH ] 
then
  cd $DEST_PATH
  cd ..
  if [ -d old ]
  then
    rm -rf old
  else
    mkdir old
  fi
  cp $DEST_PATH old 
  rm -rf $DEST_PATH/*
else
  mkdir $DEST_PATH
fi

cp -a tmp/build $DEST_PATH

# Clean up
cd $CUR_PATH
rm -rf tmp

# Display successs message
echo New Version was successfully deployed

#!/bin/bash

mkdir "./$1"
if [ -d "./head-line" ]
then
    touch "./$1/$1.js"
    touch "./$1/$1.njk"
    touch "./$1/$1.scss"
else
    echo "Error: Directory ./$1 does not exists."
fi

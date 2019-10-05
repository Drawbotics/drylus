#!/bin/sh

git config --global user.email "nick@drawbotics.com"
git config --global user.name "Nicolaos Moscholios"

git add ../../docs

git commit -m "New styleguide build" --no-verify --allow-empty

git push -u origin HEAD
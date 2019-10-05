#!/bin/sh

git config --global user.email "nicmosc@users.noreply.github.com"
git config --global user.name "nicmosc"

git add ../../docs

git commit -m "New styleguide build" --no-verify --allow-empty

git push HEAD:master
#!/bin/sh
npm run build

git add --all

git commit -m "new styleguide build"

git push

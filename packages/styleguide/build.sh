#!/bin/sh
npm run build

git add .

git commit -m "new styleguide build"

git push

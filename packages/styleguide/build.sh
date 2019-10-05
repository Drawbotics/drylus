#!/bin/sh
npm run build

git add docs

git commit -m "New styleguide build" --no-verify --allow-empty

git push -u origin HEAD
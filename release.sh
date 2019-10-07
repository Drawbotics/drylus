#!/bin/sh

export PATH=$(npm bin):$PATH

git checkout -- .

VERSION=`npx auto version`

if [ ! -z "$VERSION" ]; then
  npx auto changelog
  npx lerna publish --yes $VERSION -m '%v [skip ci]'
  npx auto release
fi
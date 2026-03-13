#!/bin/sh

export PATH=$(npm bin):$PATH

VERSION=`npx auto version`

if [ ! -z "$VERSION" ]; then
  npx auto changelog
  npx lerna publish $VERSION --yes --force-publish -m '%v [skip ci]'
fi
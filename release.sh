#!/bin/sh

export PATH=$(npm bin):$PATH

VERSION=`auto version`

if [ ! -z "$VERSION" ]; then
  npx auto changelog
  npx lerna publish --yes $VERSION -m '%v [skip ci]'
  npx auto release
fi
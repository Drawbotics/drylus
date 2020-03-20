#!/bin/sh

export PATH=$(npm bin):$PATH

VERSION=`npx auto version`

if [ ! -z "$VERSION" ]; then
  npx auto changelog
  npx lerna publish --yes --no-verify-access pre$VERSION --preid beta -m '%v [skip ci]'
fi
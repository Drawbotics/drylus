#!/bin/sh

export PATH=$(npm bin):$PATH

VERSION=`auto version`

if [ ! -z "$VERSION" ]; then
  auto changelog
  lerna publish --yes $VERSION -m '%v [skip ci]'
  auto release
fi
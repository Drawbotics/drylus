#!/bin/sh

read version _ <<< $(node -v)
echo "Current node version: $version"

if [[ $version != *"v10"* ]];
  then
    echo "Due to compatibility issues, please use node 10 to pre-publish. This will be fixed soon, promised."
  else
    export PATH=$(npm bin):$PATH

    npx lerna version prerelease --no-commit-hooks --no-changelog --yes

    npx lerna publish from-package --ignore-prepublish --dist-tag beta --pre-dist-tag beta --yes -m '%v [skip ci]'

    git stash
fi
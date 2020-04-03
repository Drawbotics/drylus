#!/bin/sh

export PATH=$(npm bin):$PATH

npx lerna version prerelease --no-commit-hooks --no-changelog --yes

npx lerna publish from-package --ignore-prepublish --dist-tag beta --pre-dist-tag beta --yes

git stash
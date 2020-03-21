#!/bin/sh

export PATH=$(npm bin):$PATH

npx lerna version prerelease --no-commit-hooks --no-changelog --no-git-tag-version --no-push

git add .

git commit -m "bump pre-release version"

npx lerna publish from-package --ignore-prepublish --no-git-reset --pre-dist-tag beta
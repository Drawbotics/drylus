#!/bin/sh

export PATH=$(npm bin):$PATH

npx lerna version preminor --no-commit-hooks --no-changelog --no-git-tag-version --no-push

npx lerna publish from-package --ignore-prepublish --yes
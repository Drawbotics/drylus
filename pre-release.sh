#!/bin/sh

export PATH=$(npm bin):$PATH

npx lerna version prerelease --no-commit-hooks --no-changelog --no-push --yes

npx lerna publish from-package --ignore-prepublish --no-git-reset --dist-tag beta
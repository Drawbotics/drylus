#!/bin/sh

export PATH=$(npm bin):$PATH

npx lerna version prerelease --no-commit-hooks --no-changelog --no-push --yes

npx lerna publish --ignore-prepublish --dist-tag beta

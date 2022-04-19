#!/usr/bin/env sh

set -e

npx --yes fern-api@0.0.2 generate packages/api/src packages/api/generated/ir.json
npx --yes fern-typescript@0.0.4 model packages/api/generated/ir.json packages/api/generated/typescript
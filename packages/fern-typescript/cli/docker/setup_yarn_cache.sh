#!/usr/bin/env sh

# install the necessary dependencies in a dummy project, so that when we run
# 'yarn install' on the generated code, the dependencies are cached.


dir=yarn-cache-setup

mkdir "$dir"
cd "$dir"

yarn init -2
yarn config set enableGlobalCache true
yarn add \
	typescript@4.7.4 \
	esbuild@0.14.48 \
	@types/node@18.0.0 \
	@fern-typescript/service-utils@0.0.118 \
	uuid@8.3.2 \
	@types/uuid@8.3.4 \
	express@4.18.1 \
	@types/express@4.17.13

cd
rm -r "$dir"
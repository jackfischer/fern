FROM node:18.1.0-alpine

# needed for yarn init
RUN apk add --no-cache git

RUN adduser --disabled-password fern
USER fern
WORKDIR /home/fern
RUN chmod -R 777 .

COPY setup_yarn_cache.sh .
RUN ./setup_yarn_cache.sh

COPY dist/bundle.js bundle.js

ENTRYPOINT ["node", "/home/fern/bundle.js"]

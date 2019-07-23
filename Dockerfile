FROM node:8.11.4-alpine

RUN mkdir -p /usr/src/unboundedpress
WORKDIR /usr/src/unboundedpress

COPY package.json ./
RUN npm install

EXPOSE 3000
CMD node bin/www

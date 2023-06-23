FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

COPY . .

RUN apk add bash
RUN npm install

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=4000

EXPOSE 4000 

# ENTRYPOINT ["npm", "run", "build", "node", ".output/server/index.mjs"]
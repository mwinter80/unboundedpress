FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

COPY . .

RUN apk add bash
RUN npm ci --platform=linuxmusl --arch=x64 --ignore-scripts=false --foreground-scripts --verbose
# RUN npm run build

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=4000

EXPOSE 4000 

# ENTRYPOINT ["npm", "run", "build", "node", ".output/server/index.mjs"]
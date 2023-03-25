FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production


COPY ./ ./
COPY .env.docker .env

EXPOSE 8000

CMD PWD
CMD npm run start:prod
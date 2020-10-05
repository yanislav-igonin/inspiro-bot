FROM node:10-alpine

WORKDIR /usr/src/app

COPY ./src ./src

RUN npm install

CMD ["npm", "run", "dev"]
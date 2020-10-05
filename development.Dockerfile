FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY tsconfig.json ./

CMD ["npm", "run", "dev"]
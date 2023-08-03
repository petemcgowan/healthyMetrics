FROM node:16-alpine

WORKDIR /usr/client/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "server"]


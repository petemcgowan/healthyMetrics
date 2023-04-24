FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000
EXPOSE 4000

CMD ["npm", "run", "server"]


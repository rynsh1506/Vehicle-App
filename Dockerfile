FROM node:18.16.0

WORKDIR /usr/src/app

COPY ["package.json",".env","./"]

COPY . ./

RUN npm install

CMD npm start
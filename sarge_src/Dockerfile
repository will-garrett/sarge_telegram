FROM node:12

WORKDIR /app

COPY . /app

RUN npm update

RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "main.js"]
FROM node:12

RUN apt-get update

RUN apt-get install -y wget

RUN wget https://yt-dl.org/latest/youtube-dl -O /usr/local/bin/youtube-dl
RUN chmod a+x /usr/local/bin/youtube-dl

WORKDIR /app

COPY . /app

RUN npm update

RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "main.js"]
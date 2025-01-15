FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY config config
COPY controllers controllers
COPY languages languages
COPY libraries libraries
COPY middleware middleware
COPY models models
COPY routes routes
COPY utils utils
COPY .env .env
COPY app.js app.js
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY README.md README.md

RUN npm install

ENTRYPOINT ["node", "app.js"]
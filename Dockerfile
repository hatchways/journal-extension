FROM node:14
COPY ./client /app/client
COPY ./server /app/server

WORKDIR /app/server
RUN npm install

WORKDIR /app/client
RUN npm install

WORKDIR /app
COPY ./run-all.sh .
CMD ./run-all.sh


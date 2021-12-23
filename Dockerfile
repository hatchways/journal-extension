FROM node:14
COPY ./client /app/client
COPY ./server /app/server

WORKDIR /app/client
RUN npm install
RUN npm run build
RUN cp -R ./build ../server/static

WORKDIR /app/server
RUN npm install
CMD npm start


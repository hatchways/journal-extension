# Journal Extension Backend

## System Requirements

This project uses Node.JS and npm.

## Getting Started

1. Setup MongoDB instance
   - Local docker:
     ```
     docker run -it --rm -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo
     ```
   - [MongoDB Atlas](https://www.mongodb.com/atlas) (free trial)
1. Create `.env` file. See `.env.sample` for reference.
1. Install dependencies.
   ```
   npm i
   ```
1. Run server!
   ```
   npm run dev
   ```

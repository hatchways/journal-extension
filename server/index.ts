import { DATABASE_URL, PORT, SESSION_SECRET } from "./env";

import { UserModel } from "./models/user";
import { authRouter } from "./routes/auth";
import express from "express";
import { journalEntriesRouter } from "./routes/journal-entries";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();

app.use(function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (typeof token === "string") {
    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err || decoded === undefined) {
        return next();
      }
      UserModel.findById(decoded.id).then((user) => {
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});

app.use("/", authRouter);
app.use("/journal-entries", journalEntriesRouter);

mongoose.connect(DATABASE_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening ${PORT}...`);
  });
});

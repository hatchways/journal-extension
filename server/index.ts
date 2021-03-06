import { DATABASE_URL, PORT, SESSION_SECRET } from "./env";

import { UserModel } from "./models/user";
import { authRouter } from "./routes/auth";
import express from "express";
import { journalEntriesRouter } from "./routes/journal-entries";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(function (req, _res, next) {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return next();
  }

  const token = authorizationHeader.split(" ")[1];
  if (typeof token === "string") {
    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err || decoded === undefined) {
        return next();
      }
      UserModel.findById(decoded.id).then((user) => {
        req.userId = user?.id;
        return next();
      });
    });
  } else {
    return next();
  }
});

app.use("/api", authRouter);
app.use("/api/journal-entries", journalEntriesRouter);
app.use("*", express.static("static/index.html"));

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening ${PORT}...`);
    });
  })
  .catch((e) => {
    console.error(e);
  });

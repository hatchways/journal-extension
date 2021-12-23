import * as z from "zod";

import { Router } from "express";
import { SESSION_SECRET } from "../env";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRouter = Router();

const authRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const generateToken = async (id: string): Promise<string> => {
  return jwt.sign({ id }, SESSION_SECRET, { expiresIn: 86400 });
};

authRouter.post("/signup", async (req, res, next) => {
  try {
    const parsed = authRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).send({
        message: parsed.error.message,
      });
    }
    const { email, password } = parsed.data;
    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      passwordHash,
    });

    const token = await generateToken(user.id);

    res.send({
      id: user.id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsed = authRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).send({
        message: parsed.error.message,
      });
    }
    const { email, password } = parsed.data;

    const user = await UserModel.findOne({ email }).exec();
    if (user === null) {
      return res.status(401).send({ message: "Wrong email and/or password." });
    }
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).send({ message: "Wrong email and/or password." });
    }

    const token = await generateToken(user.id);

    res.send({
      id: user.id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/user", async (req, res, next) => {
  try {
    if (req.userId) {
      res.send({ id: req.userId });
    } else {
      res.status(401).send("Not authenticated.");
    }
  } catch (error) {
    next(error);
  }
});

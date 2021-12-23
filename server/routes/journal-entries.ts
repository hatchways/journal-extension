import * as z from "zod";

import { JournalEntryModel } from "../models/journal-entry";
import { Router } from "express";

export const journalEntriesRouter = Router();

journalEntriesRouter.get("/", async (req, res, next) => {
  try {
    const { userId } = req;
    if (userId === undefined) {
      return res.sendStatus(401);
    }
    const entries = await JournalEntryModel.find({ user: userId }).exec();
    res.send({
      journalEntries: entries,
    });
  } catch (error) {
    next(error);
  }
});

const contactSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  notes: z.string().optional(),
});

const entryStatusSchema = z.union([
  z.literal("preparing"),
  z.literal("applied"),
  z.literal("interviewing"),
  z.literal("negotiating"),
  z.literal("accepted"),
  z.literal("rejected"),
]);

const createJournalEntrySchema = z.object({
  companyName: z.string(),
  role: z.string(),
  status: entryStatusSchema,
  location: z.string().optional(),
  appliedOn: z.string(),
  notes: z.string(),
  details: z.string().optional(),
  followUpDate: z.string().optional(),
  contacts: contactSchema.array(),
});

journalEntriesRouter.post("/", async (req, res, next) => {
  try {
    const { userId } = req;
    if (userId === undefined) {
      return res.sendStatus(401);
    }
    const parsed = createJournalEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).send({ message: parsed.error.message });
    }
    const entry = await JournalEntryModel.create({
      ...parsed.data,
      user: userId,
    });

    res.send({
      journalEntry: entry,
    });
  } catch (error) {
    next(error);
  }
});

const updateJournalEntrySchema = createJournalEntrySchema.partial();

journalEntriesRouter.patch("/:id", async (req, res, next) => {
  try {
    const { userId } = req;
    if (userId === undefined) {
      return res.sendStatus(401);
    }
    const parsed = updateJournalEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).send({ message: parsed.error.message });
    }

    const entry = await JournalEntryModel.findByIdAndUpdate(
      req.params.id,
      parsed.data,
      { new: true }
    );

    if (entry === null) {
      return res.sendStatus(404);
    }
    res.send({
      journalEntry: entry,
    });
  } catch (error) {
    next(error);
  }
});

journalEntriesRouter.delete("/:id", async (req, res, next) => {
  try {
    const { userId } = req;
    if (userId === undefined) {
      return res.sendStatus(401);
    }

    const entry = await JournalEntryModel.findByIdAndDelete(req.params.id);

    if (entry === null) {
      return res.sendStatus(404);
    }
    res.send({
      journalEntry: entry,
    });
  } catch (error) {
    next(error);
  }
});

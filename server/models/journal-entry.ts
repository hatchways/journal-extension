import mongoose from "mongoose";

const ALL_ENTRY_STATUS = [
  "preparing",
  "applied",
  "interviewing",
  "negotiating",
  "accepted",
  "rejected",
] as const;
export type EntryStatus = typeof ALL_ENTRY_STATUS[number];
export type Contact = {
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  notes?: string;
};
export type JournalEntry = {
  user: mongoose.Types.ObjectId;
  companyName: string;
  role: string;
  status: EntryStatus;
  location?: string;
  appliedOn: Date;
  notes: string;
  details?: string;
  followUpDate?: Date;
  hatchwaysApplicationId?: string;
  contacts: Contact[];
};

const contactSchema = new mongoose.Schema<Contact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

const journalEntrySchema = new mongoose.Schema<JournalEntry>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ALL_ENTRY_STATUS,
  },
  location: {
    type: String,
    required: false,
  },
  appliedOn: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: false,
  },
  followUpDate: {
    type: Date,
    required: false,
  },
  hatchwaysApplicationId: {
    type: String,
    required: false,
  },
  contacts: [contactSchema],
});

export const JournalEntryModel = mongoose.model<JournalEntry>(
  "JournalEntry",
  journalEntrySchema
);

import { createSlice } from "@reduxjs/toolkit";

export type JournalEntry = {};

const initialState: JournalEntry[] = [];

export const journalEntriesSlice = createSlice({
  name: "journalEntries",
  initialState,
  reducers: {},
});

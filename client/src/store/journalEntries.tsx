import { createJournalEntry, fetchJournalEntries } from "./thunks";

import { createSlice } from "@reduxjs/toolkit";

export type JournalEntry = {
  _id?: string;
  companyName: string;
  role: string;
  status: string;
  location?: string;
  appliedOn: string;
  notes: string;
  details?: string;
  followUpDate?: string;
};

const initialState: JournalEntry[] = [];

export const journalEntriesSlice = createSlice({
  name: "journalEntries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJournalEntries.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createJournalEntry.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

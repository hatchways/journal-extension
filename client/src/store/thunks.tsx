import { JournalEntry } from "./journalEntries";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "user/signup",
  async (payload: { email: string; password: string }) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const parsed = await response.json();
    if (!parsed.token || !parsed.id) {
      throw new Error("Failed to sign up.");
    }
    localStorage.setItem("token", parsed.token);
    return parsed.id;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const parsed = await response.json();
    if (!parsed.token || !parsed.id) {
      throw new Error("Failed to login.");
    }
    localStorage.setItem("token", parsed.token);
    return parsed.id;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
});

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return undefined;
  }
  const response = await fetch("/api/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsed = await response.json();
  if (!parsed.id) {
    throw new Error("Token expired.");
  }
  return parsed.id;
});

export const fetchJournalEntries = createAsyncThunk(
  "journal-entry/fetch",
  async () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return undefined;
    }
    const response = await fetch("/api/journal-entries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const parsed = await response.json();
    if (!parsed.journalEntries) {
      throw new Error("Failed to fetch journal entries.");
    }
    return parsed.journalEntries;
  }
);

export const createJournalEntry = createAsyncThunk(
  "journal-entry/create",
  async (payload: JournalEntry) => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return undefined;
    }
    const response = await fetch("/api/journal-entries", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const parsed = await response.json();
    return parsed.journalEntry;
  }
);

import * as z from "zod";

import { JournalEntry, JournalEntryModel } from "../models/journal-entry";

import { HATCHWAYS_BACKEND_URL } from "../env";
import { UserModel } from "../models/user";
import axios from "axios";
import mongoose from "mongoose";

const applicationSchema = z.object({
  id: z.string(),
  created: z.number().optional(),
  updated: z.number().optional(),
  status: z.string(),
  role: z.object({
    name: z.string().optional(),
    employer: z.object({
      name: z.string().optional(),
    }),
  }),
});

type Application = z.infer<typeof applicationSchema>;

const getApplicationsResponseSchema = z.object({
  applicationHistory: applicationSchema.array(),
});

export async function fetchAllApplications(
  email: string
): Promise<Application[]> {
  const candidateId = await fetchCandidateId(email);
  if (candidateId === undefined) {
    return [];
  }
  const response = await axios.get(
    `${HATCHWAYS_BACKEND_URL}/api/extensions/candidate/${candidateId}/application-history`
  );
  const parsed = getApplicationsResponseSchema.safeParse(response.data);
  if (!parsed.success) throw new Error(parsed.error.message);
  return parsed.data.applicationHistory;
}

const getUserIdResponseSchema = z.object({
  candidateId: z.number(),
});

export async function fetchCandidateId(
  email: string
): Promise<string | undefined> {
  try {
    const response = await axios.get(
      `${HATCHWAYS_BACKEND_URL}/api/extensions/candidate-id-by-email`,
      { params: { email } }
    );
    const parsed = getUserIdResponseSchema.parse(response.data);
    return parsed.candidateId.toString();
  } catch {
    return undefined;
  }
}

function hatchwaysApplicationToJournalEntry(
  application: Application,
  userId: string
): JournalEntry {
  return {
    user: new mongoose.Types.ObjectId(userId),
    companyName: application.role.employer.name ?? "Unknown",
    role: application.role.name ?? "Unknown",
    status: "applied",
    appliedOn: application.created ? new Date(application.created) : new Date(),
    notes: "Applied through Hatchways.",
    contacts: [],
    hatchwaysApplicationId: application.id,
  };
}

export async function importHatchwaysApplications(
  userId: string
): Promise<void> {
  const user = await UserModel.findById(userId);
  if (user === null) throw new Error("Missing user.");
  const email = user.email;
  const hatchwaysApplications = await fetchAllApplications(email);
  const ids = hatchwaysApplications.map((application) => application.id);
  const existingEntries = await JournalEntryModel.find({
    hatchwaysApplicationId: {
      $in: ids,
    },
  }).exec();
  const existingIds = new Set(
    existingEntries.map((e) => e.hatchwaysApplicationId)
  );
  const newApplications: Application[] = [];
  for (const application of hatchwaysApplications) {
    if (!existingIds.has(application.id)) {
      newApplications.push(application);
    }
  }
  const newEntries = newApplications.map((application) =>
    hatchwaysApplicationToJournalEntry(application, userId)
  );

  await JournalEntryModel.create(newEntries);
}

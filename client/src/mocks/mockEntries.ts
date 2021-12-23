import { JobEntry } from "../types/entry";

export const mockEntries: JobEntry[] = [
    {
        id: 236,
        companyName: "Hatchways",
        role: "Software Developer",
        status: "Preparing",
        location: "Toronto, ON",
        appliedOn: new Date(),
        notes: "These are just some additional notes for the job role!",
        contacts: [{
          name: "Test User",
          email: "user@email.com",
          phone: "7827789022",
          position: "Recruiter",
          notes: "",

        }],
        details: "Additional details go in this section",
        followUpDate: new Date(),

    },
    {
      id: 225,
      companyName: "Hatchways",
      role: "Software Developer",
      status: "Accepted",
      location: "Toronto, ON",
      appliedOn: new Date(),
      notes: "These are just some additional notes for the job role!",
      contacts: [{
        name: "Test User",
        email: "user@email.com",
        phone: "7827789022",
        position: "Recruiter",
        notes: "",

      }],
      details: "Additional details go in this section",
      followUpDate: new Date(),

  }
]
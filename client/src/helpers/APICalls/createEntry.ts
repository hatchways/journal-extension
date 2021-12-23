import { FetchOptions } from "../../types/fetchOptions";

const createEntry = async ({ companyName, role, location, status, details, notes, appliedOn, followUpDate }): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ5OGNiMjBjODYxMzhiMGFlYTc5OSIsImlhdCI6MTY0MDI3NDEyMywiZXhwIjoxNjQwMzYwNTIzfQ.r7j9kP2WLqb8gIapwo5sPIOd0R8wnlAi2hTk1-FB1OI'
     },
    body: JSON.stringify({companyName, role, location, status, details, notes, appliedOn, followUpDate}),
    credentials: 'include',
  };
  return await fetch(`api/journal-entries`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createEntry;

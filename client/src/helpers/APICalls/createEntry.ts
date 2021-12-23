import { FetchOptions } from "../../types/fetchOptions";

const createEntry = async ({ companyName, role, location, status, details, appliedOn, followUpDate }): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({companyName, role, location, status, details, appliedOn, followUpDate}),
    credentials: 'include',
  };
  return await fetch(`api/journal-entries`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createEntry;
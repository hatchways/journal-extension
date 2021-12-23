export interface FetchOptions {
    method: string;
    headers?: {
      'Content-Type': string;
      'Authorization'?: string;
    };
    body?: string;
    credentials: RequestCredentials;
  }
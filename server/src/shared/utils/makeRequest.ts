type Options = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown>;
};

export const makeRequest = async (url: string, options: Options) => {
  const DEFAULT_TIMEOUT = 8000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  return response;
};

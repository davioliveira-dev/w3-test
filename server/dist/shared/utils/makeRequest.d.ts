type Options = Omit<RequestInit, "body"> & {
    body?: Record<string, unknown>;
};
export declare const makeRequest: (url: string, options: Options) => Promise<Response>;
export {};

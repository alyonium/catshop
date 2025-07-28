import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  }),
  endpoints: (builder) => ({
    getRecords: builder.query({
      query: ({ limit, page }: { limit: number; page: number }) => ({
        url: '/breeds',
        params: { limit, page },
      }),
    }),
  }),
});

export const { useGetRecordsQuery } = api;

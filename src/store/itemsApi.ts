import { type BaseQueryApi, type FetchArgs, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import md5 from 'md5';

import {
  type IResponseIds, type IQueryIds,
  type IResponseItems, type QueryItems,
  type IResponseFields, type IQueryFields,
  type IResponseFilter, type IQueryFilter,
} from '../types/types';

const generateXAuth = (password: string): string => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const xAuth = md5(`${password}_${timestamp}`);
  return xAuth;
};

const API_KEY = process.env.REACT_APP_API_KEY as string;

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, never>) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://api.valantis.store:41000/',
      prepareHeaders: (headers) => {
        headers.set('X-Auth', generateXAuth(API_KEY));
        headers.set('Content-Type', 'application/json');
        return headers;
      },
    })(
      args,
      api,
      extraOptions,
    );
    if (result.error) {
      console.warn('Error in query:', result.error.data);
    }

    return result;
  },
  {
    maxRetries: 5,
  }
);

export const itemsApi = createApi({
  reducerPath: 'items',
  baseQuery: staggeredBaseQueryWithBailOut,
  endpoints: (builder) => ({
    getIds: builder.query<IResponseIds, IQueryIds>({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: {
          action: 'get_ids',
          params,
        }
      }),
      extraOptions: {},
    }),
    getItems: builder.query<IResponseItems, QueryItems>({
      query: (ids) => ({
        url: '',
        method: 'POST',
        body: {
          action: 'get_items',
          params: ids,
        }
      }),
      extraOptions: {},
    }),
    getFields: builder.query<IResponseFields, IQueryFields>({
      query: (keys) => ({
        url: '',
        method: 'POST',
        body: {
          action: 'get_fields',
          params: keys,
        },
      }),
      extraOptions: {},
    }),
    filter: builder.query<IResponseFilter, IQueryFilter>({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: {
          action: 'filter',
          params,
        },
      }),
      extraOptions: {},
    }),
  }),
});

export const {
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
  useFilterQuery,
  useLazyFilterQuery,
  useLazyGetItemsQuery,
} = itemsApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

const password = 'Valantis'; // hide?

export const itemsApi = createApi({
  reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.valantis.store:40000/',
    prepareHeaders: (headers) => {
      headers.set('X-Auth', generateXAuth(password));
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getIds: builder.query<IResponseIds, IQueryIds>({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: {
          action: 'get_ids',
          params,
        }
      })
    }),
    getItems: builder.query<IResponseItems, QueryItems>({
      query: (ids) => ({
        url: '',
        method: 'POST',
        body: {
          action: 'get_items',
          params: ids,
        }
      })
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
    }),
  }),
});

export const {
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
  useFilterQuery,
} = itemsApi;

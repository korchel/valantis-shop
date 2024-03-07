import { configureStore } from '@reduxjs/toolkit';

import { itemsApi } from './itemsApi';

export default configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});

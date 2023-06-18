import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from 'store/api/auth';
import { userApi } from 'store/api/userApi';
import { newsApi } from 'store/api/newsApi';
import { eventApi } from 'store/api/eventAip';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      eventApi.middleware,
      newsApi.middleware
    ])
});

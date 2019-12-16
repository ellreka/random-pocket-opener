import { configureStore } from '@reduxjs/toolkit';
import pocketModule from '../features/pocketModule';

export const setStore = () => {
  const store = configureStore({
    reducer: pocketModule.reducer,
  });
  return store;
};

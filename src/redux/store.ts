import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import inputSlice from './slices/inputSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    inputSlice,
    modalSlice,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
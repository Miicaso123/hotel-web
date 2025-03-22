import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice'
import authReducer from './authSlice'
import bookingReducer from './bookingSlice'

const store = configureStore({
  reducer: {
    image: imageReducer,
    auth: authReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
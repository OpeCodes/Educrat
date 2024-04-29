import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/user/UserSlice'
import CartSlice from '../features/cart/CartSlice'
export const store = configureStore({
  reducer: {
   user: UserSlice,
   cart: CartSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
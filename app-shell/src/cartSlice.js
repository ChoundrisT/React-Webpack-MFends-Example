// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      console.log(action.payload)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      console.log(action.payload)
      console.log("State Items: ",state.items)
    },
    resetCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart , resetCart } = cartSlice.actions;

export default cartSlice.reducer;

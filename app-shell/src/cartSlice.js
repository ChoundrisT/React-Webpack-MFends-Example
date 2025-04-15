// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // Add the van to the cart
      state.items.push(action.payload);
      console.log(action.payload)
    },
    removeFromCart: (state, action) => {
      // Remove the van from the cart
      state.items = state.items.filter(item => item.id !== action.payload);
      console.log(action.payload)
      console.log("State Items: ",state.items)
    },
    resetCart: (state) => {
      state.items = [];
    }
  },
});

// Export the actions
export const { addToCart, removeFromCart , resetCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

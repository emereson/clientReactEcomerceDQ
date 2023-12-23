// En tu slice de Redux (por ejemplo, Cart.slice.js)
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => [...state, ...action.payload],

    incrementCounter: (state, action) => {
      const { index } = action.payload;
      state[index].counter += 1;
    },

    decrementCounter: (state, action) => {
      const { index } = action.payload;

      if (state[index].counter > 1) {
        state[index].counter -= 1;
      }
    },

    removeProduct: (state, action) => {
      const { index } = action.payload;
      state.splice(index, 1);
    },

    clearCart: () => [],
  },
});

export const {
  setCart,
  incrementCounter,
  decrementCounter,
  removeProduct,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

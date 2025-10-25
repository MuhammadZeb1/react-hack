import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart_v2") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) found.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
      localStorage.setItem("cart_v2", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart_v2", JSON.stringify(state.items));
    },
    increaseQty: (state, action) => {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) {
        it.qty += 1;
        localStorage.setItem("cart_v2", JSON.stringify(state.items));
      }
    },
    decreaseQty: (state, action) => {
      const it = state.items.find((i) => i.id === action.payload);
      if (it && it.qty > 1) {
        it.qty -= 1;
        localStorage.setItem("cart_v2", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart_v2");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

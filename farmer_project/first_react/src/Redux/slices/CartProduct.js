import { createSlice } from "@reduxjs/toolkit";

// Load the state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('CartProduct');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return [];
  }
};

// Save the state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('CartProduct', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Create slice
export const ProductSlice = createSlice({
  name: "CartProduct",
  initialState: {
    ProductCount: loadFromLocalStorage(),
  },
  reducers: {
    AddProduct: (state, action) => {
      state.ProductCount.push(action.payload);
      saveToLocalStorage(state.ProductCount); // Save to localStorage after adding a product
    },
    RemoveProduct: (state, action) => {
      state.ProductCount = state.ProductCount.filter(item => item !== action.payload);
      saveToLocalStorage(state.ProductCount); // Save to localStorage after removing a product
    },
  },
});

export const { AddProduct, RemoveProduct } = ProductSlice.actions;

export default ProductSlice.reducer;

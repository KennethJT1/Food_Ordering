import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  products: [],
  error: null,
  status: "idle",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.products = [...action.payload.data];
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${baseURL}/api/products-by-categories`);
    const data = await response.json();
    return data;
  }
);

export const selectAllProducts = (state) => state.products;

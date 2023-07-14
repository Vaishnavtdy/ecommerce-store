import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../constants/api";
import axios from "axios";

const initialState = {
  data: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts(state, action) {
      state.data = action.payload;
    },
  },
});

export const {fetchProducts} = productSlice.actions;
export default productSlice.reducer;

export function getProducts() {
  return async function getProductsThunk(dispatch, getState) {
    const data = await axios.get("https://fakestoreapi.com/products");
    console.log("data", data.data);
    const results = data.data
    dispatch(fetchProducts(results));
  };
}

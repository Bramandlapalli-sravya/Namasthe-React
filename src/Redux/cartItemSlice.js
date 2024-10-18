import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchedItems = createAsyncThunk("data/recipes", async () => {
  const response = await fetch("https://dummyjson.com/recipes");
  const items = await response.json();
  return items;
});

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchedItems.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = "success";
    });
    builder.addCase(fetchedItems.rejected, (state, action) => {
      state.error = error;
      state.status = "error";
    });
    builder.addCase(fetchedItems.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default cartItemSlice.reducer;

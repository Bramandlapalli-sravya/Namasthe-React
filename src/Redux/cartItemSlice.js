import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import swiggyApiData from '../Components/MockDataApi/swiggyApiData.json';

export const fetchedItems = createAsyncThunk("data/recipes", async (searchValue, { rejectWithValue }) => {
  try{
    // this is a swiggy json api where we would get cors error by using extenstion we are getting data - "Accept-allow-origin-control"
  // const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.37240&lng=78.43780&str=${searchValue}&includeIMItem=true`);
  // above code is for searching the items api 

  // const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4325894&lng=78.4070691&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
  // console.log(response, 'response')
  const items = swiggyApiData;
  // const items = await response.json();
  console.log('total-cart-items', items)
  const data  = items?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  console.log("items data", data)
  // console.log(searchValue, 'searchValue')
  return data;
  } catch(error) {
    return rejectWithValue(error.message);
  }
});



const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: {
    cartItem: [],
    items: [],
    error: null,
    status: null
  },
  reducers: {
    addItem: (state, action)=> {
      console.log(state, 'state'); // this console return some proxy object that we will be unable to see the state
      console.log(current(state), 'current-state');  // this console return the original object from it
      // mutating the state means directly modifying the state
     state.cartItem.push(action.payload);
    },
    removeItem: (state, action)=> {
      const currentItem = action.payload;
      console.log(currentItem?.card?.info?.id , 'currentitem-id') 
      const index = state.cartItem.findIndex((item)=> item?.card?.info?.id === currentItem?.card?.info?.id  );
      console.log(index , 'index') 
      if(index != -1){
        state.cartItem.splice(index, 1);
      }
    },
    clearCart: (state)=> {
      // when your direclty modifying the state it creates a different state reference and returns empty but original state stays same
      // state = [];
      // console.log('emoty-state' , state)
      //this modify the original state
      // state.cartItem = []; 
      // or
      return {cartItem: []};
    }
  },
  extraReducers: (builder) => {
    console.log("fetchedItems full", fetchedItems.fulfilled)
    builder.addCase(fetchedItems.fulfilled, (state, action) => {
      console.log("fullfilled", action.payload)
      state.items = action.payload;
      state.status = "success";
      state.error = null
    });
    builder.addCase(fetchedItems.rejected, (state, action) => {
      console.log("error", action.payload)
      state.error = action.payload;
      state.status = "error";
    });
    builder.addCase(fetchedItems.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export const {addItem, removeItem, clearCart} = cartItemSlice.actions;
export default cartItemSlice.reducer;

import { createSlice, isPending } from "@reduxjs/toolkit";

export const ProductSlice=createSlice({
    name:"CartProduct",
    initialState:{
        ProductCount:[]
    },
    reducers:{
      AddProduct:(state,action)=>{
        state.ProductCount.push(action.payload)
      },
      RemoveProduct:(state,action)=>{
        state.ProductCount = state.ProductCount.filter(item => item !== action.payload);
      },
     
    }
})

export const { AddProduct, RemoveProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
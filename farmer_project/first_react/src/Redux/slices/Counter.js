import { createSlice, isPending } from "@reduxjs/toolkit";

export const counterSlice=createSlice({
    name:"counter",
    initialState:{
        CounterValue:0
    },
    reducers:{
      increment:(state)=>{
        state.CounterValue+=1
      },
      decrement:(state)=>{
        state.CounterValue-=1
      },
      incrementByAmount:(state,action)=>{
        state.CounterValue+=action.payload

      }
    }
})

export const {increment,decrement,incrementByAmount}=counterSlice.actions

export default counterSlice.reducer
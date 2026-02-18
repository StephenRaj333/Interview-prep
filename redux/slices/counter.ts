
import { createSlice } from "@reduxjs/toolkit";

const CounterSlice:any = createSlice({  
    name: 'counter',
    initialState: 0,
    reducers: {
        increment : state => state + 1,   
        decrement : state => state -1,     
    },  
})      
 
export const {increment,decrement} = CounterSlice.actions;

export default CounterSlice.reducer;  
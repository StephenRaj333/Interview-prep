import { createSlice } from "@reduxjs/toolkit";

const PaginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        response: [],
        loading: true,
        limit: 8,
        initialCount: 0,
        count: 8 
    },
    reducers: {
        setResponse: (state,action) => {
            state.response = action.payload
        },
        setLoading: (state,action) => {
            state.loading = action.payload
        },
        setCount: (state,action) => {
            state.count = action.payload
        },
        setinitialCount: (state,action) => {
            state.initialCount = action.payload
        },
        setLimit: (state,action) => {
            state.limit = action.payload
        }
    }       
})      
        
export const {setResponse,setLoading,setinitialCount,setCount,setLimit} = PaginationSlice.actions; 

export default PaginationSlice.reducer;
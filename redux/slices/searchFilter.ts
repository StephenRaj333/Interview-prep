import { createSlice } from "@reduxjs/toolkit";

const SearchFilterSlice = createSlice({
    name: 'seachfilter',
    initialState: {
        search: '',
        select: 'all'
    },
    reducers: {
        setSearch: (state,action) => {
            state.search = action.payload
        },
        setSelect: (state,action) => {
            state.select = action.payload 
        }   
    }   
})

export const {setSearch,setSelect} = SearchFilterSlice.actions;

export default SearchFilterSlice.reducer; 


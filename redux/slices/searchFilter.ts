import { createSlice } from "@reduxjs/toolkit";

const SearchFilterSlice = createSlice({
    name: 'seachfilter',
    initialState: {
        search: '',
        select: '',
        list: []
    },
    reducers: {
        setSearch: (state,action) => {
            state.search = action.payload
        },
        setSelect: (state,action) => {
            state.select = action.payload 
        },
        setList: (state,action) => {
            state.list = action.payload 
        }
    }   
})

export const {setSearch,setSelect,setList} = SearchFilterSlice.actions;

export default SearchFilterSlice.reducer; 


import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: 'todo',
    initialState: {
        text: '',
        list: [],
        toggle: false,
        Id: '',
        error: '',
        check: false,
        lists: [
            {
                list: '',
                check: false
            }
        ],  
    },
    reducers: {
        setText: (state,action) => {
            state.text = action.payload
        },
        setList: (state,action) => { 
            state.list = action.payload 
        },  
        setToggle: (state,action) => {
            state.toggle = action.payload
        },  
        resetText: (state) => {
            state.text = '' 
        },
        setId: (state,action) => {
            state.Id = action.payload
        },
        setError: (state,action) => {
            state.error = action.payload 
        },
        setCheck: (state,action) => {
            state.check = action.payload
        },
        setLists: (state,action) => {
            state.lists = action.payload
        },   
    }
})  

export const {setText, setList, resetText, setToggle , setId, setError, setCheck, setLists} = TodoSlice.actions; 

export default TodoSlice.reducer; 


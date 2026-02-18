import { createSlice } from "@reduxjs/toolkit";

const ValidateSlice = createSlice({  
    name: 'validate',
    initialState: {
        name: '',
        email: '',
        male: false,
        female: false  
    },
    reducers: {
        setName: (state,action) => {
            state.name = action.payload
        },
        setEmail: (state,action) => {
            state.email = action.payload
        },
        setMale: (state,action) => {
            state.male = action.payload
        },
        setFemale: (state,action) => {
            state.female = action.payload
        }
    }
})

export const {setName,setEmail,setFemale,setMale} = ValidateSlice.actions;

export default ValidateSlice.reducer; 


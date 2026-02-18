import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        setEmail: (state,action) => {
            state.email = action.payload
        },
        setPassword: (state,action) => {
            state.password = action.payload
        },
        resetForm: (state) => {
            state.email = '',
            state.password = ''
        } 
    }
})

export const { setEmail, setPassword, resetForm } = AuthSlice.actions; 

export default AuthSlice.reducer;
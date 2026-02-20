
import { createSlice } from "@reduxjs/toolkit";

const date = new Date(); 

function MonthCustomize () {
    const month:any = date.getMonth() + 1; 
    if(month.length > 1) { 
        return month; 
    } else { 
        return `0${month}` 
    }   
}

const currentDate = `${date.getFullYear()}-${MonthCustomize()}-${date.getDate()}`;  

const crudSlice = createSlice({  
    name: 'crud',
    initialState: {
        name: '',
        email: '',
        phone: '',
        grade: '10', 
        gpa: '',
        date: `${currentDate}`,  
        status: 'Active',
        list: [],
        toggle: false,
        carryId: null,
        resetData: {
            name: '',
            email: '',
            phone: '',
            grade: '10', 
            gpa: '',
            date: `${currentDate}`,  
            status: 'Active',
            toggle: false,
            carryId: null,
        }   
    },  
    reducers: {
        setName: (state,action) => {
            state.name = action.payload
        },
        setEmail: (state,action) => {
            state.email = action.payload
        },
        setPhone: (state,action) => {
            state.phone = action.payload
        },
        setGrade: (state,action) => {
            state.grade = action.payload
        },
        setGpa: (state,action) => {
            state.gpa = action.payload
        },
        setDate: (state,action) => {
            state.date = action.payload
        },
        setStatus: (state,action) => {
            state.status = action.payload
        },
        setList: (state,action) => {
            state.list = action.payload
        },
        setToggle: (state,action) => {
            state.toggle = action.payload 
        },
        setCarryId : (state,action) => {
            state.carryId = action.payload
        },
        setResetData : (state) => {
            state.name = state.resetData.name;
            state.email = state.resetData.email;
            state.phone = state.resetData.phone;
            state.grade = state.resetData.grade;
            state.gpa = state.resetData.gpa;
            state.date = state.resetData.date;
            state.status = state.resetData.status;
            state.toggle = state.resetData.toggle;
            state.carryId = state.resetData.carryId;
        }   
    }       
})      




export const {setName,setEmail,setPhone,setGrade,setGpa,setDate,setStatus,setList,setToggle,setCarryId,setResetData} = crudSlice.actions;  

export default crudSlice.reducer; 
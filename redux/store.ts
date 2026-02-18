
import {configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./slices/auth";
import CounterSlice  from "./slices/counter";  
import TodoSlice from "./slices/todo";
import ValidateSlice from "./slices/validate";
import PaginationSlice from "./slices/pagination";
import SearchFilterSlice from "./slices/searchFilter";

export const store = configureStore({  
    reducer: {
        auth: AuthSlice,
        counter: CounterSlice,
        todo: TodoSlice,
        validate: ValidateSlice,
        pagination: PaginationSlice,
        seachfilter: SearchFilterSlice 
    }   
})      


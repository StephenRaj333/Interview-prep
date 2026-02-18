'use client';
import { useState } from "react";

const UseCounter = (initialState:any) => { 

    const [counter,setCounter] = useState<any>(initialState);

    const Increment = () => {
        setCounter(() => counter + 1)
    }  

    const Decrement = () => {
        setCounter(() => counter - 1)
    }  
    
    const Reset = () => {
        setCounter(initialState);
    }

    return {counter,Increment,Decrement,Reset}
}   

export default UseCounter; 
 
'use client';

import { Suspense, useMemo, useState } from "react";

const withMemo = () => {
    const [count,setCounter] = useState(0);   
    const [theme,setTheme] = useState(false);

    console.log('Component Rendered !'); 

    const complexLogic = (num:any) => {
        console.log('re-calculating...');
        for(let i=0; i< 100_000_0000; i++) {}
        return num * 30; 
    }   

    const output = useMemo(() => {  // recalculates only when dependency changes   
        return complexLogic(count);     
    },[count]) 

    // const output = complexLogic(count);    recalculates the whole logic when component re-renders  

    return (
        <>
            <div className="container p-10 max-w-[600px] mx-auto rounded-xl" style={{background: !theme ? '#f5f5f5': '#c4c4c4'}}> 
                <div className="output text-center text-5xl mx-auto mb-10">     
                    <h1 className="text-[red]">{output}</h1>
                </div>
                <div className="button-container flex items-center gap-10 justify-center">
                    <button className="bg-black p-4 rounded-xl text-white"  onClick={() => setCounter(count - 1)}>-</button>
                    <button className="bg-black p-4 rounded-xl text-white" onClick={() => setCounter(count + 1)}>+</button>
                </div>  
                <div className="mt-10 button-container flex items-center gap-10 justify-center">
                    <button className="bg-black p-4 rounded-xl text-white" onClick={() => setTheme(!theme)}>Toggle</button> 
                </div>      
            </div>
        </>
    )
}

export default withMemo;  
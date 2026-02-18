'use client';
import { useState, useCallback , memo, useContext } from "react";
import {ThemeContext} from "@/context/context";

const Child = memo(({onClick}:any) => {    
    console.log("Child Re-rendered !");
    return (
        <>
            <div className="main-btn text-center">
                <button onClick={onClick} className="px-10 py-2 bg-black text-white text-base rounded-xl">Child Count</button>
            </div>  
        </>
    )   
})       


const Parent = () => {  
    // const [theme,setTheme] = useState(false); 
    const {theme,setTheme} = useContext<any>(ThemeContext);  
    const [count,setCount] = useState(0);        
    console.log('Parent Re-rendered !');    
    
    const handleClick = useCallback(() => { 
        console.log('function refered');  
        setCount(() => count + 1);   
    },[count])   

    return (
        <>  
            <div className="container max-w-[500px] mx-auto rounded-xl border border-[#c4c4c4] p-10" style={{background: !theme ? '#f5f5f5': '#a4a4a4'}}>   
                <Child onClick={handleClick} />    
                <div className="counter text-center my-10">
                    <h1 className="text-black text-4xl">{count}</h1>
                </div>
                <div className="theme-controls flex items-center justify-center items-center gap-10">
                    <button onClick={() => setTheme(!theme)} className="p-3 rounded-xl bg-black text-white">Toggle Theme</button>  
                </div>  
            </div>
        </>
    )
}

export default Parent;
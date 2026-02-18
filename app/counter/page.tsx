'use client';

import { useSelector, useDispatch } from "react-redux"; 
import {increment,decrement} from '@/redux/slices/counter';

const Index = () => {    
    const state = useSelector((state:any) => state.counter);    
    const dispatch = useDispatch();

    return (    
        <>      
            <div className="wrapper max-w-[500px] mx-auto h-screen flex gap-10 items-center justify-center flex-col">    
                <div className="flex gap-5">
                    <button onClick={() => dispatch(decrement())} className="button  px-3 py-2 border border-white cursor-pointer rounded-lg">Redux -</button>    
                    <h1 className="text-4xl text-center">{state}</h1>       
                    <button onClick={() => dispatch(increment())} className="button px-3 py-2 border border-white cursor-pointer rounded-lg">Redux +</button> 
                </div>  
            </div>   
        </>
    )       
}               

export default Index;  
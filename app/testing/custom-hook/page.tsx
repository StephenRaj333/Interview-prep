'use client';
import UseCounter from "@/app/test/custom-hook/page";
import { memo, useCallback, useImperativeHandle, useState, forwardRef, useRef } from "react";

const ChildCallBack = memo(({ sendData }: any) => {
    console.log('child renderred !');

    sendData(
        [
            {
                "name": "stephen",
                "age": "32",
                "city": "Chennai",
                "status": "single"
            }
        ]
    );

    return (
        <>
            <div className="child-button">
                <button className="px-6 py-2.5 bg-[green] rounded-xl">Click me !</button>
            </div>
        </>
    )
})

const ChildRefs = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ( {
        "name": "stephen",
        "age": "32",
        "city": "Chennai", 
        "status": "single"
    }));  

    return <h3>Child Component</h3>;
});


const CounterApp = () => {
    const { counter, Increment, Decrement, Reset } = UseCounter(0);
    const [dispalyData, setDisplayData] = useState('');
    const ChildRef = useRef(null);;

    console.log("Parent rendered !");

    const receiveData = useCallback((props: any) => {
        setDisplayData(props);
    }, [])

    return (
        <>
            <div className="container p-10 bg-[#c4c4c4] rounded-sm max-w-[500px] mx-auto text-center">
                <div className="couter-output">
                    <h1 className="text-white text-4xl">{counter}</h1>
                </div>
                <div className="controls my-10 flex items-center justify-center gap-10">
                    <button onClick={Increment} className="button bg-white text-black rounded-xl p-3 text-lg cursor-pointer">-</button>
                    <button onClick={Reset} className="bg-[red] p-3 rounded-xl text-white cursor-pointer">Reset</button>
                    <button onClick={Decrement} className="button bg-white text-black rounded-xl p-3 text-lg cursor-pointer">+</button>
                </div>
                <div className="my-10">
                    <ChildCallBack sendData={receiveData} />
                    <h1 className="text-green text-3xl mt-10 text-wrap">{JSON.stringify(dispalyData, null, 10)}</h1>
                </div>
                <div className="my-10"> 
                    <ChildRefs ref={ChildRef} />    
                    <button onClick={() => console.log(ChildRef.current)} className="bg-white text-black px-4 py-2 rounded-sm">Ref Data</button>
                </div>
            </div>
        </>
    )
}

export default CounterApp; 
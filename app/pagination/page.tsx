'use client';

import Image from "next/image";
import { useCallback, useEffect, useMemo} from "react";  
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setResponse, setLoading, setinitialCount, setCount } from "@/redux/slices/pagination";

const PaginationPage = () => { 

    const { response, loading , initialCount, count, limit } = useSelector((state: any) => state.pagination); 
    const dispatch = useDispatch();

    useEffect(() => {  
        const FetchData = async () => { 
            const result = await fetch('https://jsonplaceholder.typicode.com/todos/').then((res) => res.json());
            if(result) {  
                dispatch(setResponse(result));
                dispatch(setLoading(false)); 
            }   
        }   
        FetchData(); 
    }, [limit]); 

    const handleNext = () => {
        dispatch(setinitialCount(initialCount + limit));
        dispatch(setCount(count + limit)); 
    }   

    const handlePrevious = () => {
        dispatch(setinitialCount(initialCount - limit));
        dispatch(setCount(count - limit));
    }   

    const Arr = useMemo(() => {
        console.log("Memo Re-rendered");  
        const arr = [];
        const buttonLength:any = Math.ceil(response.length / limit); 
        console.log(buttonLength);
        for(let i = 1; i <= buttonLength; i++) {   
            arr.push(i);    
        }   
        return arr; 
    },[response.length,limit]);   
    
    const handleClick = useCallback((item:number) => {  
        console.log('call back function called !'); 
        const result2 = count * item;
        const result1 = result2 - limit;
        dispatch(setCount(result2));
        dispatch(setinitialCount(result1)); 
    },[limit]);   


    return (
        <>
            <div className="container">
                <div className="content" style={{ position: 'relative', height: loading ? '100vh' : '100%' }}>
                    {loading && (
                        <>
                            <div style={{ position: 'absolute', left: '43%', top: '30%', transform: 'transate(-50%,-50%)' }}>
                                <Loader size={200} className="animate-spin" />   
                            </div>
                        </>
                    )}   
                    <div className="box-wrappers">  
                        {response?.slice(initialCount,count)?.map((item:any,index:number) => {   
                            return (
                                <div key={index} className="card relative">
                                    <div className="count">
                                        <h2 className="text-2xl text-white">{item.id}</h2>     
                                    </div>
                                    <div className="img-wrapper">  
                                        {item.completed && (<Image className="w-full h-full" src={"https://www.w3schools.com/howto/img_avatar.png"} width={100} height={100} alt="male" />)}
                                        {!item.completed && (<Image className="w-full h-full" src={"https://www.w3schools.com/howto/img_avatar2.png"} width={100} height={100} alt="female" />)}
                                    </div> 
                                    <div className="title">
                                        <h4>{item?.title}</h4>   
                                    </div>
                                    <button style={{padding: '8px 40px',borderRadius: '16px',fontSize: '16px'}} className={`${item?.completed ? 'green' : 'red'}`}>
                                        {item?.completed ? 'Male': "Female"}
                                    </button> 
                                </div>   
                            )
                        })}   
                    </div>
                </div>
                <div className="pagination flex items-start justify-center gap-10" style={{padding: '40px 0'}}>
                    <div className="controls flex gap-6 justify-center"> 
                        <button style={{visibility:  initialCount <= 0 ? 'hidden' : 'visible'}} onClick={handlePrevious}><ChevronLeft className="cursor-pointer" size={24} /></button>
                        <div className="button-numbers flex items-center gap-6 max-w-[600px] mx-auto justify-center" style={{flexWrap: 'wrap'}}>   
                            {Arr?.map((item:number,index) => {
                                return( 
                                    <button onClick={() => handleClick(item)} key={index} className="cursor-pointer bg-white text-black text-sm rounded-xl p-4 py-2">{item}</button> 
                                )   
                            })} 
                        </div>
                        <button style={{visibility :count >= response.length ? 'hidden' : 'visible'}} onClick={handleNext}><ChevronRight className="cursor-pointer" size={24} /></button>
                    </div>  
                </div>
            </div>  
            <style global={false} jsx>{` 
                .box-wrappers {
                    display: grid;
                    grid-template-columns: repeat(4,1fr);
                    justify-content: center;
                    gap: 40px;
                    margin: auto; 
                }       
                
                .box-wrappers .card .img-wrapper img {
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px; 
                }   
                
                .box-wrappers .card .title {
                    padding: 24px 0;  
                }

                .box-wrappers .card .title h4 {
                    font-size: 24px;
                    line-height: normal;
                }
                
                .box-wrappers .card .green {
                    background: green;
                }

                .box-wrappers .card .red {  
                    background: red;
                }

                .box-wrappers .card {
                    position: relative;
                }
                
                .card .count { 
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: black;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px; 
                }

                .card .count h2 {
                    font-size: 24px;
                    line-height: normal;
                }
                
            `}</style>  
        </> 
    )
}

export default PaginationPage;
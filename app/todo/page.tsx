'use client';

import { useSelector, useDispatch } from "react-redux";
import { setText, setList, resetText, setToggle ,setId, setError } from "@/redux/slices/todo"; 
import { CircleX,PenLine} from 'lucide-react'; 

const TodoPage = () => {
    const {text,list,toggle,Id,error} = useSelector((state:any) => state.todo);
    const dispatch = useDispatch();

    const handleClick = () => {  
        if(text == '') {
            dispatch(setError('Please Enter Input'));
            return;
        } else {
            dispatch(setList([...list,text]));   
            dispatch(resetText());  
            dispatch(setError('')); 
        }   
    }   
    
    const deleteItem = (index:number) => {
        const lists = list.filter((__:string,idx:number) => idx !== index);  
        dispatch(setList(lists));
        dispatch(setToggle(false)); 
        dispatch(setText('')); 
        dispatch(setError('')); 
    }   

    const editItem = (item:string,index:number) => {   
        dispatch(setToggle(true));  
        dispatch(setText(item));    
        dispatch(setId(index)); 
        dispatch(setError('')); 
    }   

    const handleUpdate = () => {    
        const updatedList = list?.map((item:string,index:number) =>{
            if(index !== Id) {
               return item;
            } else {
                return text;    
            }
        }); 
        
        dispatch(setList(updatedList));
        dispatch(setId(null));
        dispatch(setToggle(false));
        dispatch(setText(''));
    }
    
    return (
        <>
            <div className="wrapper w-full max-w-[600px] mx-auto p-10">  
                <div className="title my-10">     
                    <h1 className="text-4xl text-center">Todo List</h1>
                </div>
                <div className="input-point mx-auto"> 
                    <div className="flex items-start justify-center gap-10">       
                        <div className="form-group">
                            <input value={text}  onChange={(e) => dispatch(setText(e.target.value))} placeholder="Enter Item" type="text" className="bg-[#c4c4c4] focus:outine-none outline-none focus:border-0 border border-black rounded-sm px-6 py-3 placeholder:text-white" /> 
                            {error && <p className="m3-1 text-[red] text-sm">{error}</p>}  
                        </div>  
                        <div className="btn-wrapper flex items-center ">
                            {!toggle ? 
                            <button onClick={handleClick} className="px-6 py-3 bg-white rounded-xl text-black cursor-pointer">Add Item</button> 
                            :
                            <div className={'flex items-center gap-6 justify-start'}>  
                                <button onClick={handleUpdate} className="px-6 py-3 bg-white rounded-xl text-black cursor-pointer">Update</button>
                                <CircleX className="cursor-pointer" onClick={() => {dispatch(setToggle(false)),dispatch(setText('')),dispatch(setId(null))}} />  
                            </div> 
                            }   
                        </div>   
                    </div>  
                    <div className="list-wrapper my-10">     
                        <ul style={{listStyle: 'circle'}} className="flex flex-col items-start gap-6 w-full">   
                            {list?.map((item:string,index:number) => {   
                                return (  
                                    <li key={index} className="text-white flex items-center justify-between w-full"> 
                                        <span className="text-3xl block w-full">{item}</span> 
                                        <div className="control-li flex items-center justify-start">
                                            <button onClick={() => deleteItem(index)} className="cursor-pointer text-md px-4 py-1.5">
                                                <CircleX color="white" /> 
                                            </button>
                                            <button onClick={() => editItem(item,index)} className="cursor-pointer text-md px-4 py-1.5">
                                                <PenLine /> 
                                            </button>  
                                        </div>
                                    </li>    
                                )       
                            })} 
                        </ul> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoPage;  
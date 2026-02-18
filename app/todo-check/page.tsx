'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setText ,setLists } from '@/redux/slices/todo';

const TodoCheck = () => {

    const { text,lists,check } = useSelector((state: any) => state.todo);
    const dispatch = useDispatch();

    const handleChange = (e:any,idx:number) => {    
        const updateList = lists?.map((listItem:any,listIdx:number) => {  
            if(idx == listIdx) {  
                return {...listItem,check: e.target.checked}
            }else {
                return {...listItem};
            }   
        })
        dispatch(setLists(updateList));
    }   

    const handleClick = () => {  
        dispatch(setLists([...lists,{list:text,check:check}])); 
        dispatch(setText('')); 
    }   
    
    const handleDelete = () => {   
        const filterItems = lists?.filter((item:any) => item.check !== true); 
        dispatch(setLists(filterItems)); 
    }   

    return (
        <>
            <div className="title">
                <h1 className="text-3xl text-center mb-10">Todo Check</h1>
            </div>
            <div className="container max-w-[700px] mx-auto">
                <div className="flex items-start justify-center gap-10">
                    <div className="form-group">
                        <input value={text} onChange={(e) => dispatch(setText(e.target.value))} placeholder="Enter Item" type="text" className="bg-[#c4c4c4] focus:outine-none outline-none focus:border-0 border border-black rounded-sm px-6 py-3 placeholder:text-white" />
                    </div>
                    <div className="btn-wrapper flex items-center gap-6">
                        <button onClick={handleClick} className="px-6 py-3 bg-white rounded-xl text-black cursor-pointer">Add Item</button>
                        <button onClick={handleDelete} className="px-6 py-3 bg-white rounded-xl text-black cursor-pointer">Delete Item</button>
                    </div> 
                </div>
                <div className="list-wrapper max-w-[500px] mx-auto my-10">
                    <div className="flex flex-col items-start gap-6 w-full">
                        {lists?.map((item: any, index: number) => {    
                            if(item.list !== '') {  
                                return (  
                                <div key={index} className="item flex items-center gap-2">
                                    <label className='cursor-pointer'>
                                        <input type="checkbox" checked={item?.check} onChange={(e) => handleChange(e,index)} />       
                                        <span className='text-white text-4xl'>{item?.list}</span>  
                                    </label> 
                                </div>  
                            )  
                        }   
                        })}     
                    </div>  
                </div>  
            </div>
        </>
    )
}

export default TodoCheck; 
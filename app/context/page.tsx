'use client';
import { useContext } from 'react';
import { ThemeContext } from '@/context/context';

const ContextPage = () => {
    const {theme,setTheme} = useContext<any>(ThemeContext);
  return (  
    <div className='container mx-auto p-4'>
        <button onClick={() => setTheme(!theme)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Context Button   
        </button>   
    </div>  
  )
}   

export default ContextPage

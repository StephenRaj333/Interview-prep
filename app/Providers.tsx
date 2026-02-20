'use client'

import {Provider} from 'react-redux';
import {store} from "@/redux/store";
// import {ThemeContext} from '@/context/context';
// import { useState } from 'react';


const Providers = ({children}:{children:React.ReactNode}) => {
    // const [theme,setTheme] = useState(false);
    return (
        <Provider store={store}>
        {/* // <ThemeContext.Provider value={{theme,setTheme}}>     */}
            <div className="theme p-10 rounded-sm w-full h-screen" 
                // style={{background: !theme ? 'blue' : 'red'}}
            >  
                {children} 
            </div>
        {/* // </ThemeContext.Provider> */}
         </Provider> 
    )   
}

export default Providers; 
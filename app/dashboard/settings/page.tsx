'use client'

import { useState } from "react";

const SettingsPage = () => {
    const [data,setData] = useState([]);  

    const handleClick = async () => {
        const response = await fetch('/api/data'); 
        const data = await response.json();
        setData(data);
    }

    return (
        <div className="p-10">
            <h1>Settings</h1>
            <button onClick={handleClick}>Fetch APi</button>    
            <div className="response-data">
                {JSON.stringify(data)}
            </div>
        </div>
    )
}

export default SettingsPage;
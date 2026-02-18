'use client';

import { useSelector, useDispatch } from "react-redux";
import { setSearch, setSelect } from "@/redux/slices/searchFilter";

const SearchFilter = () => {
    const {search, select} = useSelector((state:any) => state?.seachfilter); 
    const dispatch = useDispatch(); 
    
    const handleSearch = (e:any) => { 
        dispatch(setSearch(e.target.value)); 
    }

    const handleSelect = (e:any) => {
        dispatch(setSelect(e.target.value));
    }

    // console.log(select,search);   

    return (  
        <>
            <div className="container">
                <div className="title">
                    <h2 className="text-4xl text-center my-10">Seach Filter Users/Filter</h2>
                </div>
                <div className="filter-content flex items-center justify-center gap-10">    
                    <div className="search-wrapper">
                        <input type="text" value={search} onChange={handleSearch} placeholder="Search by user..." className="w-full px-6 py-2 border border-[#c4c4c4] text-black rounded-sm" /> 
                    </div>  
                    <div className="filter-dropdown">    
                        <select value={select} onChange={handleSelect} className="w-full px-6 py-2 border border-[#c4c4c4] text-black rounded-sm">   
                            <option value="all">All</option>
                            <option value="manager">Manager</option>  
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>  
                    </div>   
                </div> 
            </div> 
            <style global={true} jsx>
                {`
                    input[placeholder] {
                        color: white; 
                        padding: 12px 24px;
                        width: 100%; 
                    } 
                    select {
                        color: white; 
                        padding: 12px 24px;
                        width: 100%;
                    } 
                    select option {
                        color: black; 
                        cursor: pointer; 
                    }
                `}
            </style>  
        </>
    )
}

export default SearchFilter;  
'use client';
import Image from "next/image";
import productsList from "@/resources/products.json";
import { useSelector, useDispatch } from "react-redux";
import { setSelect, setSearch, setList } from "@/redux/slices/searchFilter";
import { useCallback, useEffect } from "react";

const SearchFilter = () => {
    const { search, select, list } = useSelector((state: any) => state.seachfilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setList(productsList));
    }, []);

    const Initializer = useCallback(() => {  
        const Roles: any = ['All'];
        const filterRolesProp = productsList?.map((item: any) => item?.role);
        const filterRoleArgument = new Set(filterRolesProp);
        filterRoleArgument?.forEach((value) => {
            Roles.push(value); 
        })
        return Roles;
    }, []);

    const handleSearch = () => {

        if (!search.trim()) {
            dispatch(setList(productsList))
        } else {
            const filteredItems = productsList?.filter((item: any) => item.name.toLowerCase().match(search));
            dispatch(setList(filteredItems));
        }
    }
    
    const handleSelect = (e: any) => {
        dispatch(setSelect(e.target.value));   
        if(e.target.value == 'All') { 
            dispatch(setList(productsList));
        } else {    
            const filterList = productsList?.filter((item:any) => item.role.match(e.target.value));
            dispatch(setList(filterList));  
        }   

    }


    return (
        <>
            <div className="container">
                <div className="title">
                    <h2 className="text-4xl text-center my-10">Seach Filter Users/Filter</h2>
                </div>
                <div className="filter-content flex items-center justify-center gap-10">
                    <div className="search-wrapper">
                        <input type="text" value={search} onKeyUp={handleSearch} onChange={(e) => dispatch(setSearch(e.target.value))} placeholder="Search by user..." className="w-full px-6 py-2 border border-[#c4c4c4] text-black rounded-sm" />
                    </div>
                    <div className="filter-dropdown">
                        <select value={select} onChange={handleSelect} className="w-full px-6 py-2 border border-[#c4c4c4] text-black rounded-sm">
                            {Initializer()?.map((item: any, index: number) => {
                                return (
                                    <option key={index} value={item}>{item}</option>  
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="list-show my-10">
                    {/* {notFound && <h1>No Results Found</h1>}  */}
                    {list?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="card">
                                <div className="img-wrapper">
                                    {item.status == 'Active' ?
                                        <>
                                            <Image className="w-full h-full" src={"https://www.w3schools.com/howto/img_avatar.png"} width={100} height={100} alt="male" />
                                        </>
                                        :
                                        <>
                                            <Image className="w-full h-full" src={"https://www.w3schools.com/howto/img_avatar2.png"} width={100} height={100} alt="female" />
                                        </>
                                    }

                                </div>
                                <div className="card-content">
                                    <div className="user-header">
                                        <h3 className="user-name">{item?.name}</h3>
                                        <span className={`status-badge block text-white text-sm font-normal`} style={{ background: item.status == 'Active' ? "green" : 'red' }}>{item.status}</span>
                                    </div>
                                    <p className="user-email">{item?.email}</p>
                                    <div className="user-details">
                                        <div className="detail-item">
                                            <span className="label">Role</span>
                                            <span className={`badge role-admin`}>{item?.role}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Category</span>
                                            <span className={`badge category-it`}>{item?.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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

                    .card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                        max-width: 320px;
                        width: 100%; 
                        transition: all 0.3s ease;
                        padding: 0;
                        margin: 0 auto;
                    }

                    .card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
                    }

                    .img-wrapper {
                        width: 100%;
                        height: 200px;
                        overflow: hidden;
                        position: relative;
                    }

                    .img-wrapper img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .card-content {
                        padding: 24px;
                        width: 100%;
                        text-align: center;
                        background: rgba(255, 255, 255, 0.95);
                        color: #1a1a1a;
                    }

                    .user-header {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        margin-bottom: 8px;
                        flex-wrap: wrap;
                    }

                    .user-name {
                        font-size: 20px;
                        font-weight: 700;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .status-badge {
                        padding: 6px 14px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .status-active {
                        background-color: #10b981;
                        color: white;
                    }

                    .status-inactive {
                        background-color: #ef4444;
                        color: white;
                    }

                    .user-email {
                        font-size: 14px;
                        color: #666;
                        margin: 0 0 16px 0;
                        word-break: break-all;
                    }

                    .user-details {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .detail-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 0;
                        border-top: 1px solid #e5e5e5;
                    }

                    .detail-item:last-child {
                        border-bottom: none;
                    }

                    .label {
                        font-size: 12px;
                        font-weight: 600;
                        color: #999;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .badge {
                        padding: 6px 14px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .role-admin {
                        background-color: #fbbf24;
                        color: #78350f;
                    }

                    .role-manager {
                        background-color: #a78bfa;
                        color: #3f0f5c;
                    }

                    .role-user {
                        background-color: #93c5fd;
                        color: #0c3b66;
                    }

                    .category-it {
                        background-color: #06b6d4;
                        color: white;
                    }

                    .category-hr {
                        background-color: #ec4899;
                        color: white;
                    }

                    .category-sales {
                        background-color: #8b5cf6;
                        color: white;
                    }

                    .list-show {
                        display: grid;
                        grid-template-columns: repeat(4,1fr);
                        gap: 24px; 
                        align-items:center;
                        justify-content: center; 
                    }
                `}
            </style>
        </>
    )
}

export default SearchFilter;  
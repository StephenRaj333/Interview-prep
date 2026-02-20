'use client';
import { useSelector, useDispatch } from "react-redux";
import { setName,setEmail,setGrade,setPhone,setGpa,setDate,setStatus,setList,setToggle,setCarryId, setResetData } from "@/redux/slices/crud";
import Axios from "axios"; 
import { useEffect } from "react";


const StudentManagement = () => {
    const {name,email,grade,phone,gpa,date,status,list,toggle,carryId,resetData} = useSelector((state:any) => state.crud); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        const fetchData = JSON.parse(localStorage.getItem('lists') || "[]"); 
        dispatch(setList(fetchData)); 
    },[]); 

    const handleClick = async () => { 
        const formData = {
            name: name,
            email: email,
            phone: phone,
            grade: grade,
            gpa: gpa,
            date: date,
            status: status
        };  
        
        try {
            const response = await Axios.post('http://localhost:8080/api/post/student/', formData);  
            if(response.status == 200) {
                const storedData = JSON.parse(localStorage.getItem('lists') || "[]"); 

                const updateItems = [...storedData, response?.data?.data]; 

                localStorage.setItem('lists',JSON.stringify(updateItems)); 

                const parseData:any = JSON.parse(localStorage.getItem('lists') || "[]");

                dispatch(setList(parseData));   

                dispatch(setResetData(resetData)); 
            }   
        } catch(err) {  
            console.log(err); 
        }   
    } 

    function handleDelete(idx:number) {
        const deleteItem = list?.filter((__:any,index:number) => idx !== index);

        localStorage.setItem('lists',JSON.stringify(deleteItem)); 

        const getItems = JSON.parse(localStorage.getItem('lists') || "[]"); 

        dispatch(setList(getItems));
        
    }   

    function handleEdit(idx:number) {
        dispatch(setCarryId(idx));
        dispatch(setToggle(true));
        
        const filteredItem = list?.filter((__:any,index:number) => idx === index);
        
        dispatch(setName(filteredItem[0].name));
        dispatch(setEmail(filteredItem[0].email));
        dispatch(setPhone(filteredItem[0].phone));
        dispatch(setGpa(filteredItem[0].gpa));
        dispatch(setGrade(filteredItem[0].grade));
        dispatch(setDate(filteredItem[0].date));
        dispatch(setStatus(filteredItem[0].status));   
    }

    const handeUpdate = () => {
        const updateItem = list?.map((item:any,index:number) => {
            if(index == carryId) { 
                return {...item,name,email,phone,grade,date,status}
            } else {
                return item;
            }
        })
        
        const stringifyData = JSON.stringify(updateItem);
        localStorage.setItem('lists',stringifyData);

        const getStorage = JSON.parse(localStorage.getItem('lists') || "[]"); 
        
        dispatch(setList(getStorage)); 

        dispatch(setResetData(resetData));
    }   


    return (
        <> 
        <div className="container-main">  
            <div className="container-content">
                {/* Header */}
                <div className="header-section">
                    <h1 className="header-title">📚 Student Management System</h1>
                    <p className="header-subtitle">Add, manage, and track student information</p>
                </div>

                <div className="grid-container">  
                    {/* Form Section */} 
                    <div className="form-column">
                        <div className="form-card">
                            <h2 className="form-title">Add Student</h2>
                            <div className="form-content">
                                {/* Name */} 
                                <div className="form-group">
                                    <label className="form-label"> 
                                        Student Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => dispatch(setName(e.target.value))}
                                        placeholder="Enter full name"
                                        className="form-input"
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => dispatch(setEmail(e.target.value))}
                                        placeholder="student@example.com"
                                        className="form-input"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => dispatch(setPhone(e.target.value))}
                                        placeholder="+1(555)000-0000"
                                        className="form-input"
                                    />
                                </div> 

                                {/* Grade */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Grade Level
                                    </label>
                                    <select
                                        name="grade"
                                        className="form-input"
                                        value={grade}
                                        onChange={(e) => dispatch(setGrade(e.target.value))} 
                                    >   
                                        <option value="9">Grade 9</option>
                                        <option value="10">Grade 10</option>
                                        <option value="11">Grade 11</option>
                                        <option value="12">Grade 12</option> 
                                    </select>
                                </div>

                                {/* GPA */}
                                <div className="form-group">
                                    <label className="form-label">
                                        GPA (0-4.0)
                                    </label>
                                    <input
                                        type="number"
                                        name="gpa"
                                        value={gpa}
                                        onChange={(e) => dispatch(setGpa(e.target.value))} 
                                        placeholder="3.8"
                                        step="0.1"
                                        min="0"
                                        max="4"
                                        className="form-input"
                                    />
                                </div>

                                {/* Enrollment Date */}
                                <div className="form-group">
                                    <label className="form-label"> 
                                        Enrollment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="enrollmentDate"  
                                        className="form-input"
                                        value={date} 
                                        onChange={(e) => dispatch(setDate(e.target.value))}  
                                    />  
                                </div>

                                {/* Status */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        className="form-input"
                                        value={status}
                                        onChange={(e) => dispatch(setStatus(e.target.value))} 
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="On Leave">On Leave</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                {!toggle ?
                                <button 
                                    className="btn-submit"
                                    onClick={handleClick}
                                >   
                                    ➕ Add Student
                                </button>
                                : 
                                <button 
                                    className="btn-submit"
                                    onClick={handeUpdate}
                                >   
                                    ➕ Update Student 
                                </button>}
                            </div>
                        </div>
                    </div>  

                    {/* Table Section */}
                    <div className="table-column">
                        <div className="table-card">
                            <div className="table-header">
                                <h2 className="table-title">Students List</h2>
                                <p className="table-subtitle">{list.length} students enrolled</p>
                            </div>

                            <div className="table-wrapper">
                                <table className="data-table">
                                    <thead>
                                        <tr className="table-header-row">
                                            <th className="table-header-cell">
                                                Name
                                            </th>
                                            <th className="table-header-cell">
                                                Email
                                            </th>
                                            <th className="table-header-cell">
                                                Phone 
                                            </th>
                                            <th className="table-header-cell">
                                                Grade
                                            </th>
                                            <th className="table-header-cell">
                                                GPA
                                            </th>
                                            <th className="table-header-cell">
                                                Enrollment
                                            </th>
                                            <th className="table-header-cell">
                                                Status
                                            </th>
                                            <th className="table-header-cell table-header-cell-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {list?.map((item:any,index:number) => {  
                                                return (
                                                    <tr key={index} className="table-row">
                                                        <td className="table-cell font-bold">{item?.name}</td> 
                                                        <td className="table-cell">{item?.email}</td>
                                                        <td className="table-cell">{item?.phone}</td>
                                                        <td className="table-cell">{item?.grade}</td>
                                                        <td className="table-cell">  
                                                            <span className="badge-gpa">
                                                                {item?.gpa} 
                                                            </span>
                                                        </td>
                                                        <td className="table-cell">
                                                            {item?.date}
                                                        </td>
                                                        <td className="table-cell">
                                                            <span className="badge-active">
                                                                {item.status}
                                                            </span>
                                                        </td>  
                                                        <td className="table-cell table-cell-center">
                                                            <button className="btn-edit" onClick={() => handleEdit(index)}> 
                                                                ✏️ Edit
                                                            </button>
                                                            <button className="btn-delete" onClick={() => handleDelete(index)}>
                                                                🗑️ Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })} 
                                    </tbody>    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style global={false} jsx>
            {`
                .container-main {
                    // min-height: 100vh;.container-content
                    background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
                    padding: 2rem;
                    border-radius: 12px;
                }

                .container-content {
                    max-width: 100%;
                    margin: 0 auto;
                }

                .header-section {
                    margin-bottom: 2rem;
                }

                .header-title {
                    font-size: 2.25rem;
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                }

                .header-subtitle {
                    color: #4b5563;
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                @media (min-width: 1024px) {
                    .grid-container {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .form-column {
                    grid-column: span 1;
                }

                @media (min-width: 1024px) {
                    .form-column {
                        grid-column: span 1;
                    }
                }

                .table-column {
                    grid-column: span 1;
                }

                @media (min-width: 1024px) {
                    .table-column {
                        grid-column: span 2;
                    }
                }

                .form-card,
                .table-card {
                    background-color: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    padding: 2rem;
                }

                .form-title,
                .table-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 1.5rem;
                }

                .form-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: 2px solid #e5e7eb;
                    color: black;
                    border-radius: 0.5rem;
                    outline: none;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .form-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .btn-submit {
                    width: 100%;
                    background: linear-gradient(to right, #2563eb, #4f46e5);
                    color: white;
                    font-weight: 600;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 1.5rem;
                }

                .btn-submit:hover {
                    background: linear-gradient(to right, #1d4ed8, #4338ca);
                    transform: scale(1.02);
                }

                .btn-submit:active {
                    transform: scale(0.98);
                }

                .table-card {
                    padding: 0;
                    overflow: hidden;
                }

                .table-header {
                    background: linear-gradient(to right, #2563eb, #4f46e5);
                    color: white;
                    padding: 1.5rem 2rem;
                }

                .table-title {
                    color: white;
                    margin-bottom: 0.25rem;
                }

                .table-subtitle {
                    color: #dbeafe;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }

                .table-wrapper {
                    overflow-x: auto;
                }

                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .table-header-row {
                    background-color: #f3f4f6;
                    border-bottom: 2px solid #e5e7eb;
                }

                .table-header-cell {
                    padding: 1rem 1.5rem;
                    text-align: left;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #374151;
                }

                .table-header-cell-center {
                    text-align: center;
                }

                .table-row {
                    border-bottom: 1px solid #e5e7eb;
                    transition: background-color 0.2s ease;
                }

                .table-row:hover {
                    background-color: #f0f9ff;
                }

                .table-cell {
                    padding: 1rem 1.5rem;
                    color: #4b5563;
                }

                .table-cell.font-bold {
                    font-weight: 600;
                    color: #1f2937;
                }

                .table-cell-center {
                    text-align: center;
                }

                .badge-gpa {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    background-color: #fef3c7;
                    color: #92400e;
                }

                .badge-active {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    background-color: #dcfce7;
                    color: #166534;
                }

                .btn-edit,
                .btn-delete {
                    background: none;
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    margin: 0 0.25rem;
                    transition: color 0.2s ease;
                    padding: 0.25rem;
                }

                .btn-edit {
                    color: #2563eb;
                }

                .btn-edit:hover {
                    color: #1d4ed8;
                }

                .btn-delete {
                    color: #dc2626;
                }

                .btn-delete:hover {
                    color: #b91c1c;
                }
            `}
        </style>
        </> 
    );
};

export default StudentManagement;  
'use client'; 
import * as Yup from "yup";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setName,setEmail,setMale,setFemale} from "@/redux/slices/validate";

const Validation = () => {
    const {name,email,male,female} = useSelector((state:any) => state.validate);  
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({name: '', email: '', checkbox: ''});

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validationSchema = Yup.object({ 
        name: Yup.string().required("Name is Required !").min(4, "Name must be at least 4 characters"),
        email: Yup.string().required("Email is Required").email("Invalid Email Format").matches(regex, "Invalid Email Format"),
        checkbox: Yup.boolean().test('at-least-one', 'Please select at least one checkbox', function() {
            return this.parent.male || this.parent.female;
        })
    });

    const handleSubmit = () => {   
        const data = { 
            name: name,
            email: email,
            male: male,
            female: female
        }   
        validationSchema.validate(data, {abortEarly: false})
        .then(() => {
            setErrors({name: '', email: '', checkbox: ''});
            alert("Validation Success !")
        }) 
        .catch((err) => {
            const newErrors = {name: '', email: '', checkbox: ''};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    if (error.path === 'name') newErrors.name = error.message;
                    if (error.path === 'email') newErrors.email = error.message;
                    if (error.path === 'checkbox') newErrors.checkbox = error.message;
                });
            }
            setErrors(newErrors);
        })
    }   

    return (   
        <>  
            <div className="container max-w-[600px] mx-auto">
                <div className="content flex flex-col items-center justify-center gap-5">   
                    <div className="form-group flex flex-col items-start justify-start w-full">  
                        <label className="mb-1" htmlFor="name">Name:</label>
                        <input type="text" value={name} onChange={(e) => dispatch(setName(e.target.value))} name="name" className="px-6 py-2 border border-white rounded-xl w-full" />
                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                    </div>  
                    <div className="form-group flex flex-col items-start justify-start w-full">
                        <label className="mb-1" htmlFor="email">Email:</label>
                        <input type="text" name="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} className="px-6 py-2 border border-white rounded-xl w-full" />
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                    </div> 
                    <div className="form-group flex flex-col items-start justify-start w-full">    
                        <div className="flex items-center justify-start gap-6 mb-1">
                            <label className="cursor-pointer">
                                <input type="checkbox" checked={male} onChange={(e) => dispatch(setMale(e.target.checked))}  />
                                <span className='text-white text-2xl'>{"Male"}</span>  
                            </label>     
                            <label className="cursor-pointer"> 
                                <input type="checkbox" checked={female} onChange={(e) => dispatch(setFemale(e.target.checked))}/>
                                <span className='text-white text-2xl'>{"Female"}</span>   
                            </label>  
                        </div>
                        {errors.checkbox && <span className="text-red-500 text-sm">{errors.checkbox}</span>}
                    </div>  
                    <div className="btn-wrapper flex items-center justify-start gap-6 max-w-[300px] mx-auto"> 
                        <button onClick={handleSubmit} className="bg-white text-black rounded-xl w-full px-10 py-2 w-full cursor-pointer">Submit</button>
                    </div>  
                </div>
            </div>  
        </>
    )
}

export default Validation;  
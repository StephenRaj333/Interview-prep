'use client'
import Axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {useRouter} from 'next/navigation';
import {setEmail,setPassword,resetForm} from "@/redux/slices/auth";

const Login = () => {   
    const router = useRouter();
    const {email,password} = useSelector((state:any) => state.auth);    
    const dispatch = useDispatch();     

    const handleSubmit = async () => {   
        if(!localStorage.getItem('email') || !localStorage.getItem('password')) { 
            try { 
                const response = await Axios.post('http://localhost:8080/api/post',{email,password},{headers: {
                    'Content-Type': 'application/json',
                }});    
                
                if(response.status == 200) {  
                    const decoded:any = jwtDecode(response.data.token);
                    localStorage.setItem('email',decoded.email);
                    localStorage.setItem('password',decoded.password);
                    dispatch(resetForm());
                    router.push('/dashboard');  
                }   
            } catch(err) {
                console.log(err); 
            }  
        } else if(localStorage.getItem('email') == email || localStorage.getItem('password') == password) { 
            alert('Authentication Successfull');  
            router.push('/dashboard'); 
        } else {
            alert('Credentials unmatched ! !'); 
        }
 
    }    

  return (
    <div className='login-wrapper w-full'>  
      <div className="container border border-[#c4c4c4] rounded-xl max-w-[25rem] p-10 mx-auto w-full h-full">     
            <div className="title">
                <h1 className="text-center text-black text-3xl">Login</h1>
            </div>
            <div className="form-content flex flex-col items-start gap-6 my-10"> 
                <div className="form-group flex flex-col items-start justify-start w-full">  
                    <label className="text-sm text-black mb-1" htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => dispatch(setEmail(e.target.value))} type="text" className="w-full text-black border border-[#c4c4c4] py-2 px-4 bg-white rounded-sm" />
                </div>  
                <div className="form-group flex flex-col items-start justify-start w-full">  
                    <label className="text-sm text-black mb-1" htmlFor="password">Password:</label>
                    <input value={password} onChange={(e) => dispatch(setPassword(e.target.value))} type="password" className="w-full text-black border border-[#c4c4c4] py-2 px-4 bg-white rounded-sm" />
                </div>   
                <button onClick={handleSubmit} className="w-full cursor-pointer h-full py-3 mt-4 px-6 bg-black text-white text-md rounded-xl">Submit</button>
            </div>  
      </div>
    </div>
  )   
}

export default Login;

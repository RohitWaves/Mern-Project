import React,{useEffect, useState} from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const[name,setName] = useState("");
    const[password,setPassword] = useState("");
    const[email,setEmail] = useState("");
    
    const navigate = useNavigate();
    const url = "http://localhost:5000/register";
    const payload = {
        name,
        email,
        password
    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
         if(auth) {
            navigate("/")
         }

    })

    const handleregiter = async () => {
        try {
            const response = await axios.post(url,payload);
            if(response) {
                localStorage.setItem('user',JSON.stringify(response))
                navigate("/");
            }
            console.log(response);
        } catch(err) {
            console.log("err",err)
        }
         
    }

    return (
        <div className="signup-container">
           <h1>Register</h1>
           <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
           <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type="button" onClick={handleregiter}>SignUp</button>
        </div>
    )
}
export default SignUp;
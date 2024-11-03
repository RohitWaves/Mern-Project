import React, { useEffect, useState } from 'react';
import './Login.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const navigate = useNavigate();

     useEffect(() => {
         const auth = localStorage.getItem('user');
         if(auth) {
             navigate("/")
         }
     },[])
     const url = "http://localhost:5000/login";
     const payload = {
        email,
        password
     }

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

      const handlelogin = async() => {
        try {
            const response = await axios.post(url,payload);
             
            console.log(response)
            if(response.data.name) {
                 localStorage.setItem("user",JSON.stringify(response))
                  navigate("/")
            } else {
                alert("Invalid")
            }
        } catch(err) {
    
            alert("Invalid email or password")
        }
        
        }
          
    return (
        <div className="login-container"> {/* Apply the class here */}
            <h2>Login</h2>
            <label htmlFor='email'>Email</label>
            <input type="email" value={email} onChange={handleEmail} />
            <label htmlFor='password'>Password</label>
            <input type="password" value={password} onChange={handlePassword} />
            <button onClick={handlelogin} type='submit'>Login</button>
        </div>
    );
}

export default Login;

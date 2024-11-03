import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Nav.css";
import { dummyimg } from "./constant";
const Nav = () => {

    const auth = localStorage.getItem('user');
    const user = auth ? JSON.parse(auth) : null;

    const navigate = useNavigate();

    const logout = () => {
        const data =   localStorage.removeItem('user')
        if(data) {
           navigate("/signup")
        }
    }

    return (
        <nav>
            <div className="logo">My Store</div> {/* Optional logo/title */}
            <ul>

                   {
                      auth ? (
                        <>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                      <li><Link to="/update">Update Product</Link></li>
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link onClick={logout} to="/logout">Logout({user.data.name})</Link></li>
                      </>
                      ) : (
                            <>
                                 <li><Link to="/signup">Signup</Link></li>
                                 <li><Link to="/login">Login</Link></li>
                            </>
                      )
                   }
       
                {/* {auth ? (
                    <>
                        <li><Link onClick={logout} to="/logout">Logout</Link></li>
                       
                    </>
                ) : (
                    <li><Link to="/signup">Signup</Link></li>
                )} */}
                
                        {/* <li><Link to="/login">Login</Link></li> */}
                  
         
            </ul>
        </nav>
    );
}

export default Nav;

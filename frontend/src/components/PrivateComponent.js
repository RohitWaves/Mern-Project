import { useEffect } from "react";
import {useNavigate,Outlet} from "react-router-dom";

const PrivateComponent = () => {
        const auth = localStorage.getItem("user")
        const navigate = useNavigate();
   
      useEffect(() => {
            if(!auth) {
                navigate("/signup")
            } 
      },[auth,navigate])
    
      return auth ? <Outlet /> : null
};

export default PrivateComponent;

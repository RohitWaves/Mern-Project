import React, { useEffect, useState } from "react";
import './AddProduct.css'; // Import the CSS file
import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error,setError] = useState("")

     const params = useParams();
     const navigate = useNavigate();

     useEffect(() => {
        console.log(params)
        getProductDetails();
     },[])

     const getProductDetails = async () => {
            const url = `http://localhost:5000/product/${params.id}`;
            try {
                 const result = await axios.get(url);
              
                    setName(result?.data?.name);
                    setPrice(result?.data?.price);
                    setCategory(result?.data?.category);
                    setCompany(result?.data?.company)
                 
            } catch(err) {
                console.log(err)
            }
     }
    
    const UpdateProduct = async () => {
        const url = `http://localhost:5000/product/${params.id}`;
        const payload = {
             name,
             price,
             category,
             company
        }
        try {
            const result = await  axios.put(url,payload);
            if(result) {
                alert("Data updated Sucessfully");
                navigate("/");
            }
        } catch(err) {
             console.log(err)
        }
        
    }

    return (
        <div className="add-product-container">
            <h2>Update Product</h2>
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            
            <label htmlFor="price">Price</label>
            <input type="number" value={price}  onWheel={(e) => e.preventDefault()} onChange={(e) => setPrice(e.target.value)} />
            <label htmlFor="category">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            <label htmlFor="company">Company</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            {/* {error && <span style={{color:"red"}}>{error}</span>} */}
            <button onClick={UpdateProduct}>Update</button>
            <ToastContainer />
        </div>
    )
}

export default UpdateProduct;

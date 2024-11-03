import React, { useState } from "react";
import './AddProduct.css'; // Import the CSS file
import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error,setError] = useState("")

    const url = "http://localhost:5000/add-product";
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const payload = {
          name,
          price,
          category,
          company,
          userId

    }
      
    const handlesubmit = async(e) => {
          e.preventDefault();
          setError("");
           if(!name || !price || !category || !company) {
               setError("Please fill in all fields");
               return;
           }
          try {
            const response = await axios.post(url,payload);
             if(response.status === 200) {
                toast.success("Product added successfully");
                setName("");
                setPrice("");
                setCategory("");
                setCompany("");
             }
          } catch(err) {
              console.log(err)
          }
    }

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            
            <label htmlFor="price">Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <label htmlFor="category">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            <label htmlFor="company">Company</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && <span style={{color:"red"}}>{error}</span>}
            <button onClick={handlesubmit}>Add</button>
            <ToastContainer />
        </div>
    )
}

export default AddProduct;

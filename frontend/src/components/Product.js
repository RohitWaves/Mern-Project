import React, { useState, useEffect } from "react";
import axios from "axios";
import './Product.css'; // Import the CSS file
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const url = "http://localhost:5000/products";
   

    const handleGetProducts = async () => {
        try {
            const response = await axios.get(url);
            console.log(response);
            setProducts(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    const deleteProduct = async (id) => {
        const deleteurl = `http://localhost:5000/product/${id}`;
        try {
            const result =  await axios.delete(deleteurl);
            if(result) {
                alert("Record is Deleted Successfully");
                handleGetProducts();
            }
        } catch(err) {
              console.log(err)
        }
    }

    const searchHandle = async (event) => { // this is an api for searching the product that an user wants
          let key = event.target.value;
            console.log("key",key)
         const searchurl = `http://localhost:5000/search/${key}`;
         if(key) {
            try {
                const result = await axios.get(searchurl);
                console.log(result,"result");
                setProducts(result.data)
          } catch(err) {
              console.log(err)
          }
         } else {
              handleGetProducts();
         }
          

    }

    return (
        <div>
               <div>
                   <input type="text" placeholder="search product" onChange={searchHandle}   />
               </div>
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product?._id}>
                                <td>{product?._id}</td>
                                <td>{product?.name}</td>
                                <td>{product?.price}</td>
                                <td>{product?.category}</td>
                                <td>{product?.company}</td>
                                <button onClick={()  => deleteProduct(product._id)}>Delete</button>
                                <Link to={"/update/"+product._id}>Update</Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Products available</p>
            )}
        </div>
    );
};

export default ProductList;

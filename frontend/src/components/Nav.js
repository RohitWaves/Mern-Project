import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    return (
        <nav>
            <div className="logo">MyStore</div> {/* Optional logo/title */}
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;

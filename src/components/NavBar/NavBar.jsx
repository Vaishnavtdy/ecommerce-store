import React from "react";
import { BsHandbag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";

import "./NavBar.scss";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <h1 onClick={()=> navigate('/')}>Store</h1>
      </div>

      <div className="app__navbar-actions">
        <div>
          <FiUser />
          <span>User</span>
        </div>
        <div>
          <AiOutlineHeart />
          <span>Wishlist</span>
        </div>
        <div>
          <BsHandbag />
          <span>Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

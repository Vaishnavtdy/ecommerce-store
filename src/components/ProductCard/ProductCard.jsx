import React from "react";

import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div className="product-card">
      <div
        className="product__details-wrapper"
        onClick={() => navigate(`/product-details/${product.id}`)}
      >
        <div className="image__container">
          <img src={product?.image} alt="product image" />
        </div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h4>INR. 600</h4>
      </div>
      <button>Add to card</button>
    </div>
  );
};

export default ProductCard;

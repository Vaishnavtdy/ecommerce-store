import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../constants/api";

import loadingIcon from '../../assets/loading.gif'
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/products/${id}`).then((res) => {
      console.log("res=>", res);
      setProduct(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadingIcon} alt="loading" width={100} />
      </div>
    );
  }

  return (
    <div className="product__details-container">
      <div className="product__image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product__details">
        <h2>{product.title}</h2>
        <span>{product.category}</span>
        <h3>INR. {product.price}</h3>
        <p>{product.description}</p>

        <button>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;

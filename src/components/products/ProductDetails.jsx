import React, { useEffcet, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";
import "../../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductDetails, productDetails } = useProducts();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <>
      {productDetails ? (
        <div className="product-details__block">
          <div className="product-details__left">
            <img
              src={productDetails.picture}
              alt=""
              className="product-details__img"
            />
          </div>
          <div className="product-details__right">
            <h1 className="product-details__desc">{productDetails.name}</h1>
            <h3 className="product-details__desc">
              Price: {productDetails.price}$
            </h3>
            <h3 className="product-details__desc">
              {productDetails.description}
            </h3>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default ProductDetails;

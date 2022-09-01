import React, { useState, useEffect } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "../../styles/EditProduct.css";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "grey",
  "&:hover": {
    backgroundColor: "#121212",
  },
}));

const EditProduct = () => {
  const { getProductDetails, productDetails, saveEditedProduct } =
    useProducts();

  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(productDetails);

  useEffect(() => {
    setProduct(productDetails);
  }, [productDetails]);

  useEffect(() => {
    getProductDetails(id);
  }, []);

  const handleInp = (e) => {
    if (e.target.name === "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setProduct(obj);
    }
  };

  return (
    <>
      {product ? (
        <div className="edit-product__form">
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            className="box-edit-product"
          >
            <h2>Edit product</h2>
            <TextField
              id="outlined-name-input"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInp}
            />
            <br />
            <TextField
              id="outlined-description-input"
              type="text"
              name="description"
              value={product.description}
              onChange={handleInp}
            />
            <br />
            <TextField
              id="outlined-price-input"
              type="text"
              name="price"
              value={product.price}
              onChange={handleInp}
            />
            <br />
            <TextField
              id="outlined-picture-input"
              type="text"
              name="picture"
              value={product.picture}
              onChange={handleInp}
            />
            <br />
            <TextField
              id="outlined-type-input"
              type="text"
              name="type"
              value={product.type}
              onChange={handleInp}
            />
            <br />
            <ColorButton
              onClick={() => {
                saveEditedProduct(product);
                navigate("/products");
              }}
              variant="contained"
            >
              Save Changes
            </ColorButton>
          </Box>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default EditProduct;

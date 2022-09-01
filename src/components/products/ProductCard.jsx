import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";
import "../../styles/ProductCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// for cart
import { useCart } from "../../contexts/CartContextProvider";

export default function ProductCard({ item }) {
  const { deleteProduct } = useProducts();

  const navigate = useNavigate();

  const { addProductToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="error:("
        height="300"
        image={item.picture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-desc"
        >
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/details/${item.id}`)}
          style={{ background: "black" }}
        >
          Details
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/edit/${item.id}`)}
          style={{ background: "black" }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => addProductToCart(item)}
          style={{ background: "black" }}
        >
          Cart
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => deleteProduct(item.id)}
          style={{ background: "black" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

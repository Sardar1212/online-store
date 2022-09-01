import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import ProductCard from "../products/ProductCard";
import { useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import "../../styles/ProductsList.css";
import FilterProduct from "./FilterProduct";

const ProductsList = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  useEffect(() => {
    getProducts();
    setPage(1);
  }, [searchParams]);

  // pagination start
  const [page, setPage] = useState(1);
  const itemsOnPage = 6;
  const count = Math.ceil(products.length / itemsOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return products.slice(begin, end);
  }

  return (
    <div className="products-list">
      <div style={{ display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "70ch" },
          }}
        >
          <TextField
            id="filled-search"
            label="Search..."
            type="search"
            variant="filled"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <div>
          <FilterProduct />
        </div>
      </div>
      <div className="products-card">
        {products ? (
          currentData().map((item) => (
            <div className="card" key={item.id}>
              <ProductCard item={item} />
            </div>
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>

      {/* pagination here */}
      <Pagination count={count} page={page} onChange={handlePage} />
    </div>
  );
};

export default ProductsList;

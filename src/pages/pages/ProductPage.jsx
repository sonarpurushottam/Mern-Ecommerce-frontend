import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/ProductList";

const ProductPage = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/brand/${brandId}`
      );
      setProducts(data);
    };
    fetchProducts();
  }, [brandId]);

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;

import React from "react";
import { useParams } from "react-router-dom";
import { useProductsByBrand } from "../hooks/useProducts";
import ProductGrid from "./ProductGrid";
import Breadcrumbs from "./Breadcrumbs"; // Import the updated Breadcrumbs component

const ProductPage = () => {
  const { brandId } = useParams();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProductsByBrand(brandId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductPage;

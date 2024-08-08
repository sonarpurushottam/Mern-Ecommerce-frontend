import { useParams } from "react-router-dom";
import { useBrands } from "../hooks/useBrands";
import { useProductsByCategory } from "../hooks/useProducts";
import BrandCarousel from "./BrandCarousel";
import ProductGrid from "./ProductGrid";

const BrandPage = () => {
  const { categoryId } = useParams();

  const {
    data: brands = [],
    isLoading: loadingBrands,
    isError: errorBrands,
    error: fetchBrandsError,
  } = useBrands(categoryId);
  const {
    data: products = [],
    isLoading: loadingProducts,
    isError: errorProducts,
    error: fetchProductsError,
  } = useProductsByCategory(categoryId);

  if (loadingBrands || loadingProducts) return <p>Loading...</p>;
  if (errorBrands || errorProducts) {
    console.error("Brands fetch error:", fetchBrandsError);
    console.error("Products fetch error:", fetchProductsError);
    return <p>Error fetching data</p>;
  }
  if (brands.length === 0 && products.length === 0) {
    return <p>No brands or products available</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      <BrandCarousel brands={brands} />

      <h2 className="text-xl font-bold mt-8 mb-4">Products in this Category</h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default BrandPage;

import { useParams } from "react-router-dom";
import { useBrands } from "../hooks/useBrands";
import { useProductsByCategory } from "../hooks/useProducts";
import BrandCarousel from "./BrandCarousel";
import ProductGrid from "./ProductGrid";
// import { FaChevronRight } from "react-icons/fa";

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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      {/* <nav className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <FaChevronRight className="inline mx-2 text-xs" />
        <Link to="/categories" className="hover:text-gray-700">
          Categories
        </Link>
        <FaChevronRight className="inline mx-2 text-xs" />
        <span className="text-gray-700">Current Category</span>
      </nav> */}

      {/* Brands Section */}
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Brands</h1> */}
      <div className="mb-12">
        <BrandCarousel brands={brands} />
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Products in this Category
      </h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default BrandPage;

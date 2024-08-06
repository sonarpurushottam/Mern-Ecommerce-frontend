// BrandSlider.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);
  const { categoryId } = useParams(); // Get the categoryId from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/brands/get");
        // Filter brands based on the categoryId if necessary
        setBrands(res.data.filter((brand) => brand.category === categoryId));
      } catch (error) {
        console.error("Error fetching brands", error);
      }
    };
    fetchBrands();
  }, [categoryId]);

  const handleBrandClick = (brandId) => {
    navigate(`/products/${brandId}`);
  };

  return (
    <div className="brand-slider">
      {brands.map((brand) => (
        <div
          key={brand._id}
          onClick={() => handleBrandClick(brand._id)}
          className="brand-item"
        >
          {/* <img src={`/uploads/brands/${brand.brandImage}`} alt={brand.name} /> */}
          <img src={brand.image} alt={brand.name} />
          <p>{brand.name}</p>
        </div>
      ))}
    </div>
  );
};

export default BrandSlider;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/brands/get"
        );
        setBrands(response.data);
        console.log("Fetched brands:", response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands");
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = brands.filter(
        (brand) => brand.category === selectedCategory
      );
      setFilteredBrands(filtered);
      console.log("Filtered brands:", filtered);
    } else {
      setFilteredBrands(brands);
    }
  }, [brands, selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          onChange={handleCategoryChange}
          className="p-2 border rounded-md w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <div key={brand._id} className="flex flex-col items-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <p className="mt-2 text-center text-sm font-medium">
                {brand.name}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-gray-500">
            No brands found for the selected category.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandSlider;

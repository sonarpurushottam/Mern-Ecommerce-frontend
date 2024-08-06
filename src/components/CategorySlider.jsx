// CategorySlider.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/get");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/brands/${categoryId}`);
  };

  return (
    <div className="category-slider">
      {categories.map((category) => (
        <div
          key={category._id}
          onClick={() => handleCategoryClick(category._id)}
          className="category-item"
        >
          <img
            // src={`/uploads/categories/${category.categoryImage}`}
            src={category.image}
            alt={category.name}
          />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;

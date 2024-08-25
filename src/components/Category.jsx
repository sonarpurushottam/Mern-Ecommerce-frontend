import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategory";

const Category = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error fetching categories</p>
    );
  if (!categories || categories.length === 0)
    return <p className="text-center text-gray-500">No categories available</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-1">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`flex flex-col items-center p-4  shadow-lg rounded-lg ${
              selectedCategory === category._id ? " border-blue-600" : ""
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            <Link
              to={`/brands/${category._id}`}
              className="flex flex-col items-center text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-200 shadow-md"
              />
              <span className="text-lg font-semibold text-cyan-600">
                {category.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

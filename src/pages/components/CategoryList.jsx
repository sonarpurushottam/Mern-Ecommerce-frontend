import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <div key={category._id}>
          <Link to={`/brands/${category._id}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

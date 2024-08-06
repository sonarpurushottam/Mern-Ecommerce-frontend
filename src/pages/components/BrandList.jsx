import React from 'react';
import { Link } from 'react-router-dom';

const BrandList = ({ brands }) => {
  if (brands.length === 0) {
    return <p>No brands available</p>;
  }

  return (
    <div>
      {brands.map((brand) => (
        <div key={brand._id}>
          <Link to={`/products/${brand._id}`} className="block mb-2 text-blue-500 hover:underline">
            {brand.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrandList;

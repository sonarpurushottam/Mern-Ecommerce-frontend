import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryList from '../components/CategoryList';

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('http://localhost:5000/api/categories/get');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <CategoryList categories={categories} />
    </div>
  );
};

export default HomePage;

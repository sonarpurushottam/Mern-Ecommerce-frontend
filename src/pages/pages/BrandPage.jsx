import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BrandList from '../components/BrandList';

const BrandPage = () => {
  const { categoryId } = useParams();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/brands/getByCategory/${categoryId}`);
        setBrands(data);
      } catch (err) {
        setError('Error fetching brands');
        console.error('Error fetching brands', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Brands</h1>
      <BrandList brands={brands} />
    </div>
  );
};

export default BrandPage;

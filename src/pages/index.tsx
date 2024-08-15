// src/pages/index.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';
import { AppDispatch, RootState } from '@/redux/store';
import ProductCard from '@/components/ProductCard';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <>
     
      <main className="container mx-auto p-4 min-h-screen">
        <h1 className="text-3xl font-bold my-4">Products</h1>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              photos={product.photos}
              discount={product.discount || 0}
            />
          ))}
        </div>


        
      </main>
     
    </>
  );
};

export default Home;

// src/components/ProductCard.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '@/redux/store';
import CartModal from './CartModal';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  photos: string[];
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description, photos, discount = 0 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.some(item => item.id === id);

  const [isCartOpen, setCartOpen] = useState(false);


  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, quantity: 1, price, photos }));
    toast.success('Item added to cart');
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
       <Link href={`/product/${id}`}>
      <img src={photos[0]} alt={name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-lg font-semibold mt-2">
        ${price.toFixed(2)} {discount > 0 && <span className="text-red-500">(${(price - discount).toFixed(2)})</span>}
      </p>
     
      </Link>
      {itemInCart ? (
        <button
        onClick={() => setCartOpen(true)}
          // onClick={() => window.location.href = '/cart'}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          View Cart
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      )}
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

    </div>
  );
};

export default ProductCard;

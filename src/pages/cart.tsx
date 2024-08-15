// src/pages/cart.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '@/redux/slices/cartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import Link from 'next/link';

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.cart);

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
        toast.success('Item removed from cart');
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success('Cart cleared');
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity <= 0) return; // Prevent setting quantity to zero or negative
        dispatch(updateQuantity({ id, quantity }));
        toast.success('Quantity updated');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {items.map(item => (
                        <div key={item.id} className="border-b border-gray-300 py-4 flex items-center">
                            <div className="flex-shrink-0 w-24 h-24">
                                {item.photos && item.photos.length > 0 ? (
                                    <img src={item.photos[0]} alt={item.name} className="w-full h-full object-cover rounded" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded"></div>
                                )}
                            </div>
                            <div className="ml-4 flex-1">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        className="bg-gray-200 p-1 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="bg-gray-200 p-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                     
                            </div>

                            <div>
                            <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                                <p className="text-lg font-bold mt-2">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                            </div>
                        </div>
                        
                    ))}
                    <button
                        onClick={handleClearCart}
                        className="mt-4 bg-blue-500 text-white py-2 px-4  mx-4 rounded"
                    >
                        Clear Cart
                    </button>
                   <Link href='/test'>Checkout</Link>

                    
                </div>
            )}
        </div>
    );
};

export default CartPage;

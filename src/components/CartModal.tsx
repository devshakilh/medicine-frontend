// components/CartModal.tsx

import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { removeItem, updateQuantity } from '@/redux/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
   
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
   
  };




  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3 mx-auto mt-20 p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex  justify-between items-center border-b py-2">
                <div className="flex  items-center space-x-10 ">
                <div className="flex-shrink-0 w-24 h-24">
                                {item.photos && item.photos.length > 0 ? (
                                    <img src={item.photos[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                )}
                            </div>
                  <div className="ml-4 ">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  
                  </div>

                  <div>
                   <button
                      className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                    <p className="text-lg font-bold mt-2">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                   </div>

                </div>
              </li>
            ))}
          </ul>
        )}
<Link href="/test" className="mt-4 bg-gray-500 text-white px-4 m-4 py-2 rounded">Checkout</Link>
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CartModal;

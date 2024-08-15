import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { useState } from 'react';
import CartModal from './CartModal';

const Navbar: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user); // Get user from state

  // const handleLogout = () => {
  //   dispatch(logout()); // Dispatch the logout action
  //   localStorage.removeItem('authToken'); // Remove token from local storage
  //   // Optional: Redirect to login or home page
  // };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl">Medicine Shop</Link>
        <div className="space-x-4 flex items-center">
         
          <button
            onClick={() => setCartOpen(true)}
            className="text-white"
          >
            View Cart
          </button>
          <Link href="/login" className="text-white">Login</Link>
          <Link href="/register" className="text-white">Register</Link>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;

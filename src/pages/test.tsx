import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store';
import axios from 'axios'; // Import axios for HTTP requests

const Checkout: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare the order data
      const orderData = {
        items: cartItems,
        shippingAddress: address,
        totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      // Submit the order
      await axios.post('http://localhost:5000/api/orders', orderData);

      // Clear the cart (if needed)
      // dispatch(clearCart());

      // Redirect to a confirmation page
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-4">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="md:w-1/2 pl-4">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b border-gray-300 py-2">
                <div>{item.name}</div>
                <div>${item.price.toFixed(2)} x {item.quantity}</div>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-4">
              <div>Total:</div>
              <div>
                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

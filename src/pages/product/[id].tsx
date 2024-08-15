import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/slices/cartSlice';

import axios from 'axios'; // Adjust import path if needed
import { Product } from '../../../types';

interface ProductProps {
  product: Product | null; // Allow product to be null
}

const ProductPage: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (!product) {
    return <p>Product not found.</p>; // Handle missing product case
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      photos: product.photos,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
    router.push('/cart');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2">
          <img
            src={product.photos[0] || '/default-image.jpg'} // Use a default image if photos is empty
            alt={product.name}
            className="w-full h-auto object-cover rounded"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">Price: ${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">
            {product.stockStatus ? (
              <span className="text-green-500 font-bold">In Stock</span>
            ) : (
              <span className="text-red-500 font-bold">Out of Stock</span>
            )}
          </p>
          <div className="mb-4">
            {product.variants.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Variants:</h2>
                <ul>
                  {product.variants.map((variant) => (
                    <li key={variant.name} className="mb-1">
                      <span className="font-bold">{variant.name}:</span> 
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.stockStatus}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              !product.stockStatus ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Server-side function to fetch product details
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  
  if (typeof id !== 'string') {
    return { props: { product: null } }; // Handle invalid ID case
  }

  try {
    // Fetch the product from your API or database
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    const product = response.data;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductPage;

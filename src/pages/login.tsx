import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store'; // Adjust the import path as needed
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await dispatch(loginUser({ email, password })).unwrap();
    toast.success('Login in Successful')
      router.push('/dashboard'); // Redirect to a protected page after login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (

    <div className='min-h-screen items-center flex justify-center m-auto'>
        <form onSubmit={handleSubmit} className="max-w-sm  mx-auto p-4 bg-white rounded shadow-md ">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className={`bg-blue-500 text-white py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <ToastContainer/>
    </form>
    </div>
  
  );
};

export default LoginForm;

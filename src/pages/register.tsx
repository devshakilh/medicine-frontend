
// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     photo: null as File | null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [countdown, setCountdown] = useState<number | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData({ ...formData, photo: e.target.files[0] });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('password', formData.password);
//     if (formData.photo) formDataToSend.append('photo', formData.photo);

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/registers', formDataToSend);
//       setMessage(response.data.message);
//       startCountdown();
//     } catch (error: any) {
//       if (error.response) {
//         setMessage(error.response.data.message || 'Registration failed.');
//       } else {
//         setMessage('Registration failed.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startCountdown = () => {
//     let time = 60;
//     setCountdown(time);
//     const interval = setInterval(() => {
//       time -= 1;
//       if (time <= 0) {
//         clearInterval(interval);
//         setCountdown(null);
//       } else {
//         setCountdown(time);
//       }
//     }, 1000);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border border-gray-200 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Profile Photo</label>
//           <input
//             type="file"
//             name="photo"
//             onChange={handleFileChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full p-2 text-white bg-blue-500 rounded ${loading ? 'opacity-50' : ''}`}
//         >
//           {loading ? 'Submitting...' : 'Register'}
//         </button>
//       </form>
//       {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//       {countdown !== null && (
//         <p className="mt-4 text-center text-gray-500">
//           Please verify your email. You can request a new OTP in {countdown} seconds.
//         </p>
//       )}
//     </div>
//   );
// };
import { useRegisterUserMutation, useResendVerificationCodeMutation } from '@/redux/slices/apiSlice';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { resetCountdown, decrementCountdown } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [registerUser, { isLoading: isRegistering, isError: registerError, isSuccess: isRegistered }] = useRegisterUserMutation();
  const [resendVerificationCode, { isError: resendError }] = useResendVerificationCodeMutation();
  const dispatch = useDispatch();
  const { countdown, resendAvailable } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      toast.error('Please upload a photo.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);

    try {
      await registerUser(formData).unwrap();
      alert('Registration successful! Please check your email.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      await resendVerificationCode(email).unwrap();
    alert('Verification code resent!');
      dispatch(resetCountdown()); // Reset the countdown after successful resend
    } catch (error) {
      console.error('Resend failed:', error);
      toast.error('Failed to resend verification code.');
    }
  };

  useEffect(() => {
    if (isRegistered && countdown > 0) {
      const timer = setInterval(() => {
        dispatch(decrementCountdown());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, isRegistered, dispatch]);

  return (
  <div className='min-h-screen items-center flex justify-center m-auto'>
      <div className="max-w-md mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          required
          className="mt-1 block w-full"
        />
        <button
          type="submit"
          disabled={isRegistering}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
        {registerError && <p className="text-red-500 mt-2">Registration failed!</p>}
        {isRegistered && (
          <div className="mt-4">
            <p>Please check your email for the verification code.</p>
            <p className="mt-2">
              {countdown > 0 ? (
                <span>Resend code in {countdown} seconds</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Resend Code
                </button>
              )}
            </p>
          </div>
        )}
        {resendError && <p className="text-red-500 mt-2">Failed to resend verification code.</p>}
      </form>
    
    </div>
  </div>
  );
};

export default RegisterForm;

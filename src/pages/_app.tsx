import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Toaster } from 'react-hot-toast';

import Footer from '../components/Footer';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
<Navbar/>
      <Component {...pageProps} />
      <Toaster />
    
      <Footer />
    </Provider>
  );
}

export default MyApp;


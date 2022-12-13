import '../styles/globals.css'
import type { AppProps } from 'next/app';
import axios from 'axios';
import { store } from '../redux/store';
import { Provider } from 'react-redux';



axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_PATH;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
)}

export default MyApp

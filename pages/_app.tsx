import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ToastContainer />
			<Component {...pageProps} />
		</>
	);
}

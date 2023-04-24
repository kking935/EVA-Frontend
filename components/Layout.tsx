import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Head>
				<title>EVA Demo</title>
			</Head>

      <Header />

			<main className='bg-secondary w-full pt-8 pb-96 px-2'>
				<div className=' mx-auto py-10 max-w-3xl'>{children}</div>
			</main>

			<Footer />
		</>
	);
};

export default Layout;

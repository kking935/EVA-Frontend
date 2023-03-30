import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Head>
				<title>EVA Demo</title>
			</Head>

      <Header />

			<main className='bg-secondary w-full pt-8 pb-52 px-2'>
				<div className=' mx-auto py-10 max-w-3xl'>{children}</div>
			</main>

			<footer className='bg-dark text-center text-dark w-full px-10 pt-14 pb-8'>
				<h1 className='text-lg font-extrabold'>EVA &copy; 2023</h1>
			</footer>
		</>
	);
};

export default Layout;

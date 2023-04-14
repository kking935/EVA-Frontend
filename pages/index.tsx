import Link from 'next/link';
import Layout from '../components/Layout';

const HomePage = () => {
	return (
		<Layout>
			<h1 className='font-bold text-3xl text-center mb-5'>ABOUT EVA</h1>

			<p className='text-md leading-7'>
				<b>EVA</b> is an elderly virtual assistant leverages natural
				language processing to identify health risks for socially
				isolated senior citizens. By referencing to a senior
				citizen&lsquo;s <b>EVA Health Report</b>, care teams can better
				address risk factors and improve health outcomes.
			</p>

			<div className='flex justify-center items-center mt-16'>	
				<Link href='/survey' className='action-item font-bold text-dark'>
					Take Survey
				</Link>
			</div>
		</Layout>
	);
};

export default HomePage;

import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import Layout from '../components/Layout';

const HomePage = () => {
	const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

	const handleSignUp = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/survey',
			},
			authorizationParams: {
				prompt: 'login',
				screen_hint: 'signup',
			},
		});
	};

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
				{
					isAuthenticated ? (
						<Link href='/survey' className='action-item font-bold text-dark'>
							Take Survey
						</Link>
					) : (
						<button onClick={handleSignUp} className='action-item font-bold text-dark'>
							Sign Up To Take Survey
						</button>
					)
				}
			</div>
		</Layout>
	);
};

export default HomePage;

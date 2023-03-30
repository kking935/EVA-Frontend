import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';

const Header = () => {
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

	const handleLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/survey',
			},
			authorizationParams: {
				prompt: 'login',
			},
		});
	};

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	return (
		<header className='bg-primary w-full px-10 py-4 flex items-center justify-between flex-row flex-wrap md:flex-nowrap'>
			<Link
				className='flex flex-row justify-center items-center space-x-4'
				href='/'
			>
				<h1 className='text-2xl font-extrabold'>EVA</h1>
			</Link>
			<nav className='flex space-x-8 flex-row flex-wrap md:flex-nowrap'>
				<Link
					className='font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
					href={'/about/risks'}
				>
					Risks
				</Link>
				<Link
					className='font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
					href={'/about/questions'}
				>
					Questions
				</Link>
				{isAuthenticated ? (
					<>
						<Link
							className='font-semibold border transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
							href={'/survey'}
						>
							Survey
						</Link>
						<button
							onClick={handleLogout}
							className='border bg-dark text-dark font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
						>
							Logout
						</button>
					</>
				) : (
					<>
						<button
							onClick={handleLogin}
							className='border font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
						>
							Login
						</button>
						<button
							onClick={handleSignUp}
							className='border bg-dark text-dark hover:text-black font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
						>
							Sign Up
						</button>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;

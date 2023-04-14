import Link from 'next/link';

const Header = () => {
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
				<Link
					className='font-semibold border transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
					href={'/survey'}
				>
					Survey
				</Link>
			</nav>
		</header>
	);
};

export default Header;

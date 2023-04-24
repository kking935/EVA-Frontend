import Link from 'next/link';
import { FaHandHoldingHeart } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {
	return (
		// bg-primary
		<header className='bg-gradient-to-b from-blue-300 to-blue-400 w-full px-1 sm:px-10 py-4 flex items-center justify-between flex-col space-y-3 sm:space-y-0 md:flex-row flex-wrap md:flex-nowrap'>
			<Link
				className='flex flex-row justify-center items-center space-x-4'
				href='/'
			>
				{/* <FaHandHoldingHeart size={32} />
				<h1 className='text-2xl font-extrabold'>EVA</h1> */}
				<Image src='/images/eva.png' alt='eva' width={250} height={250} />
			</Link>
			<nav className='flex space-x-3 sm:space-x-8 flex-row flex-wrap md:flex-nowrap'>
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

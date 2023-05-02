import Link from 'next/link';
import Image from 'next/image';
// import { FaHandHoldingHeart } from 'react-icons/fa';

const Header = () => {
	return (
		<header className='bg-gradient-to-b from-blue-300 to-blue-400 w-full px-1 md:px-10 py-4 flex items-center justify-between flex-col space-y-2 md:space-y-0 md:flex-row flex-wrap md:flex-nowrap'>
			<Link
				className='flex flex-row justify-center items-center space-x-4 p-3 rounded-xl'
				href='/'
			>
				<Image
					src='/images/eva.png'
					alt='eva'
					width={250}
					height={250}
				/>
			</Link>
			<nav className='md:border-none border-t pt-5 border-black flex space-x-3 md:space-x-8 flex-row flex-wrap md:flex-nowrap'>
				<Link
					className='font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
					href={'/risks'}
				>
					Risks
				</Link>
				<Link
					className='font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md'
					href={'/questions'}
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

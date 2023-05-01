import { FaHome, FaRegQuestionCircle } from 'react-icons/fa';
import Layout from '../components/Layout';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<Layout>
			<div className='mb-16 flex flex-row items-center justify-center space-x-5'>
				<FaRegQuestionCircle size={30} />
				<h2 className='text-2xl font-semibold'>404 Page Not Found</h2>
				<FaRegQuestionCircle size={30} />
			</div>
            
			<div className='flex items-center justify-center'>
				<Link
					href='/'
					className='w-fit action-item font-bold text-dark flex items-center justify-center space-x-2 h-12'
				>
					<FaHome size={30} />
					<p className='text-lg sm:text-base'>RETURN HOME</p>
				</Link>
			</div>
		</Layout>
	);
};

export default NotFoundPage;

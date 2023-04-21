import Link from 'next/link';
import Layout from '../components/Layout';
import {
	FaArrowRight,
	FaCalendar,
	FaChevronRight,
	FaPlus,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getReports } from '../services/users.service';

const HomePage = () => {
	const [reports, setReports] = useState<ReportsModel[]>();

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getReports();
			if (error) {
				console.log(error);
				return;
			}
			setReports(data);
		}

		fetchData();
	}, []);

	return (
		<Layout>
			<div className='bg-gray-200 p-10 rounded-xl shadow mb-12'>
				<h2 className='font-bold text-3xl text-center mb-3'>
					ABOUT EVA
				</h2>

				<p className='text-md leading-7'>
					<b>EVA</b> is an elderly virtual assistant leverages natural
					language processing to identify health risks for socially
					isolated senior citizens. By referencing to a senior
					citizen&lsquo;s <b>EVA Health Report</b>, care teams can
					better address risk factors and improve health outcomes.
				</p>
			</div>

			<div className='flex justify-between items-end border-b-2 pb-1 mb-5'>
				<h3 className='font-semibold text-2xl'>PAST REPORTS</h3>

				<Link
					href='/survey'
					className='action-item font-bold text-dark flex items-center justify-center space-x-2 h-12'
				>
					<FaPlus />
					<p>NEW SURVEY</p>
				</Link>
			</div>

			<ul>
				{reports?.map((report: ReportsModel) => (
					<Link key={report.rid} href={`/report?id=${report.rid}`}>
						<li className='px-5 py-3 rounded-lg shadow w-full flex items-center justify-between'>
							<div className=' text-gray-700 pr-5 border-r flex items-center justify-start space-x-2'>
								<p>
									<FaCalendar size={20} />
								</p>
								<p className='font-semibold text-base'>
									{'12/23/22'}
								</p>
							</div>
							<p className=' text-sm italic px-5 truncate flex-grow'>
								{report.summary}
							</p>
							<p>
								<FaChevronRight className='' size={15} />
							</p>
						</li>
					</Link>
				)) || <p className='text-center my-10'>No reports yet</p>}
			</ul>
		</Layout>
	);
};

export default HomePage;

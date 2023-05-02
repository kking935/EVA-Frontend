import Link from 'next/link';
import Layout from '../components/common/Layout';
import {
	FaArrowRight,
	FaCalendar,
	FaChevronRight,
	FaPlus,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getReports } from '../services/backend.service';
import LoadingIcon from '../components/common/LoadingIcon';
import About from '../components/common/About';
import { actionButtonStyles } from '../components/TailwindStyles';

const DisplayReports = ({ reports }: { reports: ReportsModel[] }) => {
	return (
		<>
			{reports.map((report: ReportsModel) => (
				<Link key={report.rid} href={`/report?id=${report.rid}`}>
					<li className='text-gray-700 px-5 py-3 rounded-lg shadow w-full flex items-center justify-between'>
						<p className='border-r pr-5 font-bold whitespace-nowrap text-sm sm:text-lg'>
							Report {report.rid}
						</p>
						<div className=' whitespace-nowrap font-semibold sm:border-r text-xs sm:text-base px-5 flex items-center justify-end space-x-2'>
							<p>
								<FaCalendar size={20} />
							</p>
							<p>{report.created_at}</p>
						</div>
						<p className='invisible sm:visible text-sm italic px-5 truncate flex-grow'>
							{report.summary}
						</p>
						<p>
							<FaChevronRight className='' size={15} />
						</p>
					</li>
				</Link>
			))}
		</>
	);
};

const NoReports = () => {
	return (
		<>
			<p className='text-center my-10'>No reports yet</p>
		</>
	);
};

const renderContent = (reports: ReportsModel[] | undefined, loading: boolean) => {
	if (loading) {
		return <LoadingIcon loading={loading} />;
	} else if (reports && reports.length > 0) {
		return <DisplayReports reports={reports} />;
	} else {
		return <NoReports />;
	}
};

const HomePage = () => {
	const [reports, setReports] = useState<ReportsModel[]>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getReports();
			if (error || !data) {
				console.log(error);
				return;
			}
			data.sort(
				(a: ReportsModel, b: ReportsModel) =>
					parseInt(b.rid) - parseInt(a.rid)
			);
			setReports(data);
			setLoading(false);
		}

		fetchData();
	}, []);

	return (
		<Layout>
			<About />

			<div className='flex justify-between items-end border-b-2 pb-1 mb-5'>
				<h3 className='font-semibold text-xl sm:text-2xl'>
					PAST REPORTS
				</h3>

				<Link
					href='/survey'
					className={`${actionButtonStyles} font-bold flex items-center justify-center space-x-2 h-12`}
				>
					<FaPlus />
					<p className='text-xs sm:text-base'>NEW SURVEY</p>
				</Link>
			</div>

			<ul>{renderContent(reports, loading)}</ul>
		</Layout>
	);
};

export default HomePage;

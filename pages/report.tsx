import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { FaClipboard, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getReport } from '../services/backend.service';
import LoadingIcon from '../components/LoadingIcon';
import ReportCard from '../components/ReportCard';

// const ReportIdSnippet = ({ reportId }: { reportId: string }) => {
// 	const copyToClipboard = () => {
// 		navigator.clipboard.writeText(reportId);
// 		toast('Report ID copied to clipboard!');
// 	};

// 	return (
// 		<button
// 			className='action-item ml-2 fill-current'
// 			onClick={copyToClipboard}
// 		>
// 			<FaClipboard />
// 		</button>
// 	);
// };


const NoReport = () => {
	return (
		<>
			<p className='text-center my-10'>Report not found</p>
		</>
	);
};

const renderContent = (report: ReportsModel | undefined, loading: boolean) => {
	if (loading) {
		return <LoadingIcon loading={loading} />;
	} else if (report) {
		return <ReportCard report={report} />;
	} else {
		return <NoReport />;
	}
};

const ReportPage = () => {
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const [report, setReport] = useState<any>(null);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			const reportId = router.query.id;
			if (!reportId) {
				setLoading(false);
				return;
			}

			const { data, error } = await getReport(reportId as string);
			if (error) {
				setError(error);
				setLoading(false);
				return;
			}
			setReport(data);
			setLoading(false);
		}

		fetchData();
	}, [router.query.id]);

	return (
		<Layout>
			<div className='flex flex-row items-center justify-center'>
				<div className='w-1/5'></div>
				<h2 className='font-bold text-2xl w-3/5 text-center'>Report</h2>
				<div className='w-1/5 flex flex-row items-center justify-end'>
					{/* <ReportIdSnippet reportId={report.rid} /> */}
					<button
						onClick={() => setEdit(true)}
						className='action-item fill-current'
					>
						<FaEdit size={20} />
					</button>
				</div>
			</div>
			<hr className='my-5 border-current' />
			{renderContent(report, loading)}
		</Layout>
	);
};

export default ReportPage;

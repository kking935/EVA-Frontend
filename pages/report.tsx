import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import { FaClipboard, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getReport } from '../services/backend.service';
import LoadingIcon from '../components/common/LoadingIcon';
import {ReportCard} from '../components/Report/ReportCard';

// const ReportIdSnippet = ({ reportId }: { reportId: string }) => {
// 	const copyToClipboard = () => {
// 		navigator.clipboard.writeText(reportId);
// 		toast('Report ID copied to clipboard!');
// 	};

// 	return (
// 		<button
// 			className='ml-2 fill-current'
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
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const [report, setReport] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			const reportId = router.query.id;
			if (!reportId) {
				setLoading(false);
				return;
			}

			const { data, error } = await getReport(reportId as string);
			if (error) {
				console.log(error);
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
			{renderContent(report, loading)}
		</Layout>
	);
};

export default ReportPage;

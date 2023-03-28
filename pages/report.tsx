import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { FaClipboard } from 'react-icons/fa';
import { toast } from 'react-toastify';

const uid = '6ee99396-193a-404a-9284-fddf1497f3c4';

const ReportIdSnippet = ({ reportId }: { reportId: string }) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(reportId);
		toast('Report ID copied to clipboard!');
	};

	return (
		<div className='px-3 color-secondary border border-current rounded-xl w-fit flex flex-row space-x-2 justify-center items-center'>
			<p className='text-primary italic'>{reportId?.substring(0, 4)}...</p>
			<button className='ml-2 fill-current' onClick={copyToClipboard}>
				<FaClipboard />
			</button>
		</div>
	);
};

const ReportPage = () => {
	const router = useRouter();
	const [report, setReport] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			const reportId = router.query.id;

			if (!reportId) {
				return;
			}

			const report = await fetch(
				`http://localhost:5000/users/${uid}/reports/${reportId}`
			)
				.then((res) => res.json())
				.catch((err) => console.error(err));

			console.log(report);
			console.log('the summary is:', report.summary);
			setReport(report);
		}

		fetchData();
	}, [router.query.id]);

	return (
		<Layout>
			{report ? (
				<>
					<div className='flex flex-row items-center justify-center'>
						<div className='w-1/5'></div>
						<h2 className='font-bold text-2xl w-3/5 text-center'>
							Report
						</h2>
						<div className='w-1/5 flex flex-row items-center justify-end'>
							<ReportIdSnippet reportId={report.rid} />
						</div>
					</div>
					<hr className='my-5 border-current' />

					<h3 className='font-semibold text-xl'>Summary</h3>
					<p>{report.summary}</p>

					<h3 className='font-semibold text-xl'>Risk Factors</h3>
					{Object.entries(report.overall_risk_factors).map(
						([key, value]) => (
							<div key={key}>
								<span>{key}: </span>
								<span>{value as ReactNode}</span>
							</div>
						)
					)}
				</>
			) : (
				<div>Fetching report...</div>
			)}
		</Layout>
	);
};

export default ReportPage;

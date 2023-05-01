import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { FaClipboard } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getReport } from '../services/backend.service';

const ReportIdSnippet = ({ reportId }: { reportId: string }) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(reportId);
		toast('Report ID copied to clipboard!');
	};

	return (
		<button
			className='action-item ml-2 fill-current'
			onClick={copyToClipboard}
		>
			<FaClipboard />
		</button>
	);
};

const ReportPage = () => {
	const router = useRouter();
	const [report, setReport] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [showReport, setShowReport] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const reportId = router.query.id;
			if (!reportId) {
				return;
			}

			const { data, error } = await getReport(reportId as string);
			if (error) {
				setError(error);
				return;
			}
			setReport(data);
		}

		fetchData();
	}, [router.query.id]);

	return (
		<Layout>
			{report && report !== null ? (
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

					<h3 className='underline font-semibold text-xl mt-5'>
						Summary
					</h3>
					<p>{report.summary}</p>

					<h3 className='font-semibold text-xl mt-5 underline'>
						Risk Factors
					</h3>
					{Object.entries(report.overall_risk_factors).length > 0 ? (
						<ul className=''>
							{Object.entries(report.overall_risk_factors).map(
								([domain, subdomains]: [any, any]) => (
									<li key={domain}>
										<p className='font-bold'>{domain}: </p>
										<ul className='ml-5 list-disc'>
											{subdomains.map(
												(subdomain: string) => (
													<li key={subdomain}>
														{subdomain}
													</li>
												)
											)}
										</ul>
									</li>
								)
							)}
						</ul>
					) : (
						<>No risk factors found.</>
					)}

					<div
						className={`flex flex-row items-center justify-start border-b border-t mt-16 py-3 border-black`}
					>
						<h3 className='grow font-semibold text-xl'>
							Full Report
						</h3>
						<button
							className='action-item'
							onClick={() => setShowReport(!showReport)}
						>
							{showReport ? 'Hide' : 'Show'} Full Report
						</button>
					</div>
					{showReport ? (
						<>
							{Object.entries(report.survey).map(
								([question_id, entry]: [string, any]) => (
									<div className='mb-10' key={question_id}>
										<p className='font-bold'>
											{parseInt(question_id)}.{' '}
											{entry.question}
										</p>
										<p>
											{'>'} {entry.answer}
										</p>
										<ul className='p-3 border'>
											{Object.entries(
												entry.risk_factors
											).map(
												([domain, subdomains]: [
													any,
													any
												]) => (
													<li key={domain}>
														<p className='font-bold'>
															{domain}:{' '}
														</p>
														<ul className='ml-5 list-disc'>
															{subdomains.map(
																(
																	subdomain: string
																) => (
																	<li
																		key={
																			subdomain
																		}
																	>
																		{
																			subdomain
																		}
																	</li>
																)
															)}
														</ul>
													</li>
												)
											)}
										</ul>
									</div>
								)
							)}
						</>
					) : (
						<></>
					)}
				</>
			) : error ? (
				<div className='mt-10 text-center'>{error}</div>
			) : (
				<div className='mt-10 text-center'>Fetching report...</div>
			)}
		</Layout>
	);
};

export default ReportPage;

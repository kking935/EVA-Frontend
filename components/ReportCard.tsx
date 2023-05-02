import { useState } from 'react';
import {
	FaChevronRight
} from 'react-icons/fa';
import { DisplayLabelIcons } from './LabelCard';

const DisplayFullReport = ({ report }: { report: ReportsModel }) => {
	return (
		<>
			{Object.entries(report.survey).map(
				([question_id, entry]: [string, any]) => (
					<div className='mb-10' key={question_id}>
						<p className='font-bold'>
							{parseInt(question_id)}. {entry.question}
						</p>
						<div className=' inline-flex justify-center items-center space-x-1'>
							<FaChevronRight size={10} />
							<p className='italic'>{'"'}{entry.answer}{'"'}</p>
						</div>
						<DisplayLabelIcons labels={entry.risk_factors} />
					</div>
				)
			)}
		</>
	);
};

const ReportCard = ({ report }: { report: ReportsModel }) => {
	console.log('The report is ', report);
	const [showReport, setShowReport] = useState(false);

	return (
		<>
			<div className='border rounded-lg p-3 shadow'>
				<div className='flex flex-row items-center justify-between border-b border-gray-300 mb-3 pb-2'>
					<h3 className='font-semibold text-xl pt-2'>Summary</h3>
					<p className='italic text-sm text-right font-semibold text-gray-700'>
						{report.created_at}
					</p>
				</div>
				<p>{report.summary}</p>
				<DisplayLabelIcons labels={report.overall_risk_factors} />
				<div
					className={`flex flex-row items-center justify-end border-t border-gray-300 mt-4 pt-2`}
				>
					<h3 className='grow font-semibold text-xl'>Full Report</h3>
					<button
						className='action-item'
						onClick={() => setShowReport(!showReport)}
					>
						{showReport ? 'Hide' : 'Show'} Full Report
					</button>
				</div>
				{showReport && <DisplayFullReport report={report} />}
			</div>
		</>
	);
};

export default ReportCard;

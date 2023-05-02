import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { getSublabelStringsFromLabelsDict } from '../../utils/helpers';
import { DisplayLabelIcon } from '../LabelCard';
import { actionButtonStyles } from '../TailwindStyles';

const DisplayFullReport = ({ report }: { report: ReportsModel }) => {
	return (
		<>
            <hr />
			{Object.entries(report.survey).map(
				([question_id, entry]: [string, any]) => (
					<div className='mb-10' key={question_id}>
						<p className='font-bold'>
							{parseInt(question_id)}. {entry.question}
						</p>
						<div className=' inline-flex justify-center items-center space-x-1'>
							<FaChevronRight size={10} />
							<p className='italic'>
								{'"'}
								{entry.answer}
								{'"'}
							</p>
						</div>
						{entry.risk_factors && (
							<div className='flex flex-row justify-start items-center flex-wrap'>
								{getSublabelStringsFromLabelsDict(
									entry.risk_factors
								).map(({ sublabel }: { sublabel: string }) => (
									<DisplayLabelIcon
										key={`display-${sublabel}`}
										sublabel={sublabel}
									/>
								))}
							</div>
						)}
					</div>
				)
			)}
		</>
	);
};

const ViewReport = ({ report }: { report: ReportsModel }) => {
	const [showReport, setShowReport] = useState(false);

	return (
		<>
			<p>{report.summary}</p>
			<div className='flex flex-row justify-start items-center flex-wrap'>
				{getSublabelStringsFromLabelsDict(
					report.overall_risk_factors
				).map(({ sublabel }: { sublabel: string }) => (
					<DisplayLabelIcon
						key={`display-${sublabel}`}
						sublabel={sublabel}
					/>
				))}
			</div>
			<div
				className={`flex flex-row items-center justify-end border-t border-gray-300 mt-4 pt-2`}
			>
				<h3 className='grow font-semibold text-xl'>Full Report</h3>
				<button
					type='button'
					className={`${actionButtonStyles}`}
					onClick={() => setShowReport(!showReport)}
				>
					{showReport ? 'Hide' : 'Show'} Full Report
				</button>
			</div>
			{showReport && <DisplayFullReport report={report} />}
		</>
	);
};

export default ViewReport;

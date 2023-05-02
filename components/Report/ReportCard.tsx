import { useEffect, useState } from 'react';
import {
	FaCheckCircle,
	FaCheckSquare,
	FaChevronRight,
	FaEdit,
	FaQuestionCircle,
	FaRegTrashAlt,
	FaUndo,
	FaUpload,
	FaUserCheck,
	FaUserShield,
	FaUserSlash,
	FaXRay,
	FaXing,
} from 'react-icons/fa';
import { actionButtonStyles } from '../TailwindStyles';
import { DisplayLabelIcon } from '../LabelCard';
import {
	createLabelDict,
	getSublabelStringsFromLabelsDict,
} from '../../utils/helpers';
import { getLabels, updateReport } from '../../services/backend.service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { EditLabels } from '../EditLabels';
import EditReport from './EditReport';
import ViewReport from './ViewReport';

export const ReportCard = ({ report }: { report: ReportsModel }) => {
	console.log('The report is ', report);
	const [edit, setEdit] = useState(false);

	const handleCancel = () => {
		setEdit(false);
	};

	return (
		<>
			<div className='border rounded-lg p-3 shadow'>
				<div className='flex flex-row items-center justify-between border-b border-gray-300 mb-3 pb-2'>
					<div className='flex items-start justify-start flex-grow space-x-2'>
						<h3 className='font-bold text-2xl pt-2'>Summary</h3>
						{report.verified ? (
							<div className='flex justify-center items-center text-xs text-blue-300 space-x-1'>
								<FaUserCheck size={18} />
								<p>Verified</p>
							</div>
						) : (
							<div className='flex justify-center items-center text-xs text-red-300 space-x-1'>
								<FaUserSlash  size={18}  />
								<p>Not verified</p>
							</div>
						)}
					</div>

					{/* <ReportIdSnippet reportId={report.rid} /> */}

					{!edit && (
						<button
							onClick={() => setEdit(true)}
							className='flex items-center justify-center text-xs space-x-1 border rounded-xl py-1 px-2 '
						>
							<FaEdit size={16} />
							<p>{report.verified ? 'Edit Report' : 'Verify Report' }</p>
						</button>
					)}
					{edit && (
						<div className='flex items-center justify-center space-x-3'>
							<button
								onClick={() => handleCancel()}
								className='flex items-center justify-center text-xs space-x-1 border rounded-xl py-1 px-2 '
							>
								<FaRegTrashAlt size={16} />
								<p>Cancel Edit</p>
							</button>
						</div>
					)}
				</div>

				<p className='italic text-sm text-left font-semibold text-gray-700'>
					{report.created_at}
				</p>

				{edit ? (
					<EditReport report={report} />
				) : (
					<ViewReport report={report} />
				)}
			</div>
		</>
	);
};

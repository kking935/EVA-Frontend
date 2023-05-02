import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronRight, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
	getSublabelStringsFromLabelsDict,
	createLabelDict,
} from '../../utils/helpers';
import { getLabels, updateReport } from '../../services/backend.service';
import { EditLabels } from '../EditLabels';
import { actionButtonStyles } from '../TailwindStyles';

const getIncludeExcludeLabels = (
	all_labels: LabelsModel[],
	labels_dict: Record<string, string[]>
) => {
	const sublabels_with_labels = getSublabelStringsFromLabelsDict(labels_dict);
	const sublabels_names = sublabels_with_labels.map(
		(group) => group.sublabel
	);
	const include: any = [];
	const exclude: any = [];
	all_labels.forEach((label: LabelsModel) => {
		const present_sublabels = label.sublabels.filter((sublabel) =>
			sublabels_names.includes(sublabel.sublabel)
		);
		const absent_sublabels = label.sublabels.filter(
			(sublabel) => !sublabels_names.includes(sublabel.sublabel)
		);
		if (present_sublabels.length > 0) {
			include.push({
				...label,
				sublabels: present_sublabels,
			});
		}
		if (absent_sublabels.length > 0) {
			exclude.push({
				...label,
				sublabels: absent_sublabels,
			});
		}
	});
	return {
		include: include,
		exclude: exclude,
	};
};

const EditEntry = ({
	question_id,
	report,
    setReport,
	allLabels,
}: {
	question_id: string;
	report: ReportsModel;
    setReport: any,
	allLabels: LabelsModel[];
}) => {
    const entry = report.survey[question_id]
	const { include, exclude } = getIncludeExcludeLabels(
		allLabels,
		report.survey[question_id].risk_factors || {}
	);
	const [includedLabels, setIncludedLabels] =
		useState<LabelsModel[]>(include);
	const [excludedLabels, setExcludedLabels] =
		useState<LabelsModel[]>(exclude);

        useEffect(() => {
            report.survey[question_id].risk_factors = createLabelDict(includedLabels)
            setReport(report)
        }, [includedLabels, excludedLabels, question_id, report, setReport],)

	return (
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
			{/* {entry.risk_factors && (
				<div className='flex flex-row justify-start items-center flex-wrap'>
					{getSublabelStringsFromLabelsDict(entry.risk_factors).map(
						({ sublabel }: { sublabel: string }) => (
							<DisplayLabelIcon
								key={`display-${sublabel}`}
								sublabel={sublabel}
							/>
						)
					)}
				</div>
			)} */}

			<div className='flex items-center justify-start flex-row w-full flex-wrap'>
				<p className='flex-grow text-md font-semibold underline'>
					Identified Risks
				</p>
				<EditLabels
					questionLabels={includedLabels}
					unselectedLabels={excludedLabels}
					setQuestionLabels={setIncludedLabels}
					setUnselectedLabels={setExcludedLabels}
				/>
			</div>
		</div>
	);
};

const EditFullReport = ({
	report,
	allLabels,
    setReport
}: {
	report: ReportsModel;
	allLabels: LabelsModel[];
    setReport: any
}) => {
	return (
		<>
			<hr />

			{Object.entries(report.survey).map(
				([question_id, entry]: [string, SurveyQuestion]) => (
					<EditEntry
						key={`edit-entry-${question_id}`}
						question_id={question_id}
                        report={report}
                        setReport={setReport}
						allLabels={allLabels}
					/>
				)
			)}
		</>
	);
};

const EditReport = ({ report }: { report: ReportsModel }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const [unselectedLabels, setUnselectedLabels] = useState<LabelsModel[]>([]);
	const [overallLabels, setOverallLabels] = useState<LabelsModel[]>([]);
	const [allLabels, setAllLabels] = useState<LabelsModel[]>([]);

    const [inEditReport, setInEditReport] = useState<ReportsModel>(report)

	useEffect(() => {
		const fetchLabels = async () => {
			console.log('fetching...');
			const { data, error } = await getLabels();
			console.log(data);
			if (error || !data) {
				console.log(error);
				return;
			}

			data.sort(
				(a: LabelsModel, b: LabelsModel) =>
					parseInt(a.lid) - parseInt(b.lid)
			);
			for (let label of data) {
				label.sublabels.sort(
					(a: SublabelModel, b: SublabelModel) =>
						parseInt(a.slid) - parseInt(b.slid)
				);
			}

			const getIncludeExclude = (
				all_labels: LabelsModel[],
				labels_dict: Record<string, string[]>
			) => {
				const sublabels_with_labels =
					getSublabelStringsFromLabelsDict(labels_dict);
				const sublabels_names = sublabels_with_labels.map(
					(group) => group.sublabel
				);

				const included_labels: any = [];
				const excluded_labels: any = [];

				all_labels.forEach((label: LabelsModel) => {
					const present_sublabels = label.sublabels.filter(
						(sublabel) =>
							sublabels_names.includes(sublabel.sublabel)
					);
					const absent_sublabels = label.sublabels.filter(
						(sublabel) =>
							!sublabels_names.includes(sublabel.sublabel)
					);

					if (present_sublabels.length > 0) {
						included_labels.push({
							...label,
							sublabels: present_sublabels,
						});
					}
					if (absent_sublabels.length > 0) {
						excluded_labels.push({
							...label,
							sublabels: absent_sublabels,
						});
					}
				});

				return {
					included_labels: included_labels,
					excluded_labels: excluded_labels,
				};
			};

			const { included_labels, excluded_labels } = getIncludeExclude(
				data,
				report.overall_risk_factors
			);
			setAllLabels(data);
			setOverallLabels(included_labels);
			setUnselectedLabels(excluded_labels);
		};
		fetchLabels();
	}, [report?.overall_risk_factors]);

	const [showReport, setShowReport] = useState(false);

	const handleSubmitReport = async (formData: any) => {
		const confirmed = window.confirm(
			`Are you sure you would like to update report ${report.rid}?`
		);
		if (!confirmed) {
			return;
		}

		console.log(formData);
		report.summary = formData['summary'];
		report.overall_risk_factors = createLabelDict(overallLabels);
		const { data, error } = await updateReport(report);
		if (error || !data) {
			toast.error(error);
			return;
		}

		router.reload();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(
					async (data) => await handleSubmitReport(data)
				)}
			>
				<textarea
					className='w-full border p-3 rounded h-48'
					{...register('summary')}
					defaultValue={report.summary || ''}
				/>

				<div className='flex flex-row justify-start items-center flex-wrap'>
					{/* {getSublabelStringsFromLabelsDict(
						createLabelDict(overallLabels)
					).map(({ sublabel }: { sublabel: string }) => (
						<DisplayLabelIcon
							key={`display-${sublabel}`}
							sublabel={sublabel}
						/>
					))} */}
					<p className='flex-grow text-lg font-semibold'>
						Overall Risks:
					</p>
					<EditLabels
						questionLabels={overallLabels}
						unselectedLabels={unselectedLabels}
						setQuestionLabels={setOverallLabels}
						setUnselectedLabels={setUnselectedLabels}
					/>
				</div>
				<div
					className={`flex flex-row items-center justify-end border-t border-gray-300 mt-4 pt-2`}
				>
					<h3 className='grow font-semibold text-lg'>Full Report</h3>
					<button
						type='button'
						className={`${actionButtonStyles}`}
						onClick={() => setShowReport(!showReport)}
					>
						{showReport ? 'Hide' : 'Show'} Full Report
					</button>
				</div>
				{showReport && (
					<EditFullReport report={inEditReport} allLabels={allLabels} setReport={setInEditReport} />
				)}

				<div className='flex items-center justify-center mt-3 pt-3 border-t'>
					<button
						className={`${actionButtonStyles} flex items-center justify-center space-x-3 px-4`}
						type='submit'
					>
						<FaUpload size={20} />
						<p>Submit</p>
					</button>
				</div>
			</form>
		</>
	);
};

export default EditReport;

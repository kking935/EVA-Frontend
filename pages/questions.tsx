import { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import {
	createQuestion,
	deleteQuestion,
	getLabels,
	getQuestions,
} from '../services/backend.service';
import LoadingIcon from '../components/common/LoadingIcon';
import { DisplayLabelIcon, labelStyles } from '../components/LabelCard';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { actionButtonStyles } from '../components/TailwindStyles';
import {
	FaCloudUploadAlt,
	FaPlus,
	FaRegTrashAlt,
	FaTrash,
} from 'react-icons/fa';
import { EditLabels } from '../components/EditLabels';

export const DisplaySelectedLabel = ({
	label,
	sublabel,
}: {
	label: string;
	sublabel: string;
}) => {
	return (
		<div
			className={`w-fit shadow my-0.5 mr-2 h-8 text-xs sm:text-sm px-2 space-x-1 rounded-lg flex justify-center items-center ${labelStyles[label].color}`}
		>
			{labelStyles[label].sublabels[sublabel]}
			<p>{sublabel}</p>
		</div>
	);
};

const DisplayQuestions = ({
	questions,
	setLoading,
	setQuestions,
}: {
	questions: QuestionsModel[];
	setLoading: any;
	setQuestions: any;
}) => {
	const handleDeleteQuestion = async (question: QuestionsModel) => {
		const confirmed = window.confirm(
			`Are you sure you would like to delete question ${question.qid}?`
		);
		if (!confirmed) {
			return;
		}
		setLoading(true);

		const { data, error } = await deleteQuestion(question);
		if (error || !data) {
			toast.error(error);
			setLoading(false);
			return;
		}

		const qResponse = await getQuestions();
		if (qResponse.error || !qResponse.data) {
			toast.error(error);
			setLoading(false);
			return;
		} else {
			qResponse.data.sort(
				(a: QuestionsModel, b: QuestionsModel) =>
					parseInt(a.qid) - parseInt(b.qid)
			);
			setQuestions(qResponse.data);
			setLoading(false);
		}
	};

	return (
		<ul>
			{questions.map((question: QuestionsModel) => (
				<li
					key={`question-${question.qid}`}
					className='mb-5 shadow-lg p-3 rounded-xl'
				>
					<div className='flex items-start justify-start'>
						<p className='flex-grow'>
							{question.qid}. {question.question}
						</p>
						<button
							className='pr-1 pl-2'
							onClick={async () =>
								await handleDeleteQuestion(question)
							}
						>
							<FaRegTrashAlt className='fill-red-700' />
						</button>
					</div>
					<div className='flex flex-row justify-start items-center flex-wrap'>
						{question.labels?.map((label: LabelsModel) =>
							label.sublabels.map((sublabel: SublabelModel) => (
								<DisplayLabelIcon
									key={label.label + sublabel.sublabel}
									sublabel={sublabel.sublabel}
								/>
							))
						)}
					</div>
				</li>
			))}
		</ul>
	);
};

const timeoutTime = 500;

// const QuestionsPage = ({ questions }: { questions: QuestionsModel[] }) => {
const QuestionsPage = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState<QuestionsModel[]>();

	const [unselectedLabels, setUnselectedLabels] = useState<LabelsModel[]>([]);
	const [questionLabels, setQuestionLabels] = useState<LabelsModel[]>([]);

	useEffect(() => {
		async function fetchQuestions() {
			const { data, error } = await getQuestions();
			if (error || !data) {
				console.log(error);
				return;
			}
			data.sort(
				(a: QuestionsModel, b: QuestionsModel) =>
					parseInt(a.qid) - parseInt(b.qid)
			);
			setQuestions(data);
			return;
		}
		async function fetchLabels() {
			const { data, error } = await getLabels();
			if (error || !data) {
				console.log(error);
				return;
			}
			data.sort(
				(a: LabelsModel, b: LabelsModel) =>
					parseInt(a.lid) - parseInt(b.lid)
			);
			data.forEach((label: LabelsModel) => {
				label.sublabels.sort(
					(a: SublabelModel, b: SublabelModel) =>
						parseInt(a.slid) - parseInt(b.slid)
				);
			});
			setUnselectedLabels(data);
			setLoading(false);
		}
		fetchQuestions();
		fetchLabels();
	}, []);

	const sortSublabels = (sublabels: SublabelModel[]) => {
		sublabels.sort(
			(a: SublabelModel, b: SublabelModel) =>
				parseInt(a.slid) - parseInt(b.slid)
		);
	};

	const sortLabels = (labels: LabelsModel[]) => {
		labels.sort(
			(a: LabelsModel, b: LabelsModel) =>
				parseInt(a.lid) - parseInt(b.lid)
		);
		labels.forEach((label: LabelsModel) => {
			sortSublabels(label.sublabels);
		});
	};

	const handleNewQuestion = async (formData: any) => {
		setLoading(true);
		const question = {
			question: formData['new-question'],
			labels: questionLabels,
		};

		const { data, error } = await createQuestion(question);
		if (error || !data) {
			toast.error(error);
			setQuestions(undefined);
			setLoading(false);
			return;
		}

		if (questions) {
			const newQuestions = [...questions, data];
			newQuestions.sort(
				(a: QuestionsModel, b: QuestionsModel) =>
					parseInt(a.qid) - parseInt(b.qid)
			);
			setQuestions(newQuestions);
		} else {
			setQuestions([data]);
		}

		const total_labels = [...unselectedLabels, ...questionLabels];
		sortLabels(total_labels);
		setUnselectedLabels(total_labels);
		setQuestionLabels([]);
		reset();
		setLoading(false);
	};

	return (
		<Layout>
			<div className='flex flex-col'>
				<h2 className='font-bold text-2xl text-center'>Questions</h2>
				<hr className='my-5' />
				{loading && <LoadingIcon loading />}
				{!loading && (
					<>
						{!questions && (
							<p>There was an error fetching the questions</p>
						)}
						{questions && questions.length == 0 && (
							<p className='text-center'>
								There are no questions yet
							</p>
						)}
						{questions && questions.length > 0 && (
							<DisplayQuestions
								questions={questions}
								setLoading={setLoading}
								setQuestions={setQuestions}
							/>
						)}
						<hr className='mt-5 mb-8' />
						<form
							className=' px-0 sm:px-10'
							onSubmit={handleSubmit(
								async (data) => await handleNewQuestion(data)
							)}
						>
							<div className='flex flex-row flex-wrap space-x-2 items-center justify-center my-2'>
								<div className='flex flex-col flex-grow -mt-11'>
									{
										<p
											className={`pl-3 italic text-red-500 ${
												errors['new-question']
													? ''
													: 'invisible'
											}`}
										>
											* Invalid field
										</p>
									}
									<input
										className='px-3 py-2 rounded-lg flex-grow border'
										placeholder='Enter a new question'
										type='text'
										{...register('new-question', {
											required: true,
										})}
									/>
								</div>

								<EditLabels
									questionLabels={questionLabels}
									unselectedLabels={unselectedLabels}
									setQuestionLabels={setQuestionLabels}
									setUnselectedLabels={setUnselectedLabels}
								/>
							</div>

							<div className='inline-flex justify-center items-center w-full mt-5'>
								<button
									className={`${actionButtonStyles} font-bold w-32 h-12 shadow-lg flex items-center justify-center space-x-2`}
									type='submit'
								>
									<FaCloudUploadAlt size={20} />
									<p>Add</p>
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</Layout>
	);
};

export default QuestionsPage;

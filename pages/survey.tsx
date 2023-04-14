// import Layout from '../components/Layout';
// import { useForm } from 'react-hook-form';
// import Link from 'next/link';
// import { useState } from 'react';
// import { FaSpinner } from 'react-icons/fa';
// import { postSurvey } from '../services/users.service';
// import { toast } from 'react-toastify';
// import questions from '../data/short_questions.json';

// const SurveyPage = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();

// 	const [rid, setRid] = useState(null);
// 	const [loading, setLoading] = useState(false);

// 	const uploadAnswers = async (formData: any) => {
// 		setLoading(true);
// 		console.log(formData);
// 		const entries = [];
// 		for (const id in formData) {
// 			entries.push({
// 				question: questions[parseInt(id)].question,
// 				answer: formData[id],
// 				question_id: parseInt(id),
// 			});
// 		}
// 		console.log(entries);

// 		const { data, error } = await postSurvey(entries);
// 		console.log('Server responded with data: ', data, 'and error: ', error);
// 		setLoading(false);

// 		if (error) {
// 			toast.error(error);
// 			setRid(error);
// 			return;
// 		}

// 		setRid(data);
// 	};

// 	return (
// 		<Layout>
// 			<h2 className='font-bold text-2xl text-center'>Survey</h2>
// 			{loading ? (
// 				<div className='w-32 h-32 mx-auto text-primary bg-primary font-bold text-2xl mt-32 pt-32 px-32 pb-24 shadow-lg rounded-xl flex flex-col items-center justify-center'>
// 					<div className='animate-pulse flex justify-center items-center flex-col space-y-5'>
// 						<FaSpinner size={40} className='animate-spin' />
// 						<p>SUBMITTING</p>
// 					</div>
// 				</div>
// 			) : rid ? (
// 				<div className='text-2xl mt-32 flex space-y-3 flex-col justify-center items-center'>
// 					<p className='font-bold text-2xl'>Submission Success!</p>
// 					<Link
// 						className='action-item text-dark font-bold w-32 text-center'
// 						href={`/report?id=${rid}`}
// 					>
// 						View Results
// 					</Link>
// 				</div>
// 			) : (
// 				<form
// 					className='border shadow-xl rounded-xl my-10 py-4 md:py-8 px-7 md:px-14'
// 					onSubmit={handleSubmit(
// 						async (data) => await uploadAnswers(data)
// 					)}
// 				>
// 					{questions.map((question, index) => {
// 						return (
// 							<div className='mb-10' key={`question-${index}`}>
// 								<p>
// 									{index + 1}. {question.question}
// 								</p>
// 								<textarea
// 									className='px-3 py-2 rounded-lg'
// 									{...register(`${index}`, {
// 										required: true,
// 									})}
// 								/>
// 								{errors[`${index}`] && (
// 									<p>Unanswered question</p>
// 								)}
// 							</div>
// 						);
// 					})}
// 					<div className='inline-flex justify-center items-center w-full mt-10'>
// 						<button
// 							className='action-item text-dark font-bold w-32'
// 							type='submit'
// 						>
// 							Submit
// 						</button>
// 					</div>
// 				</form>
// 			)}
// 		</Layout>
// 	);
// };

// export default SurveyPage;

import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { createSurvey, addAnswer } from '../services/users.service';
import { toast } from 'react-toastify';

const timeoutTime = 500

const SurveyPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [rid, setRid] = useState(null);
	const [sid, setSid] = useState<string>();
	const [question, setQuestion] = useState<QuestionsModel>();

	useEffect(() => {
		const handleNewSurvey = async () => {
			try {
				const { data, error } = await createSurvey();
				console.log(data);
				if (error || !data) {
					toast.error(error);
					setQuestion(undefined);
				} else {
					setSid(data.sid);
					setQuestion(data.survey[data.cur_qid]);
				}
			} catch (error) {
				toast.error('Failed to fetch question.');
				setQuestion(undefined);
			}
		};

		setTimeout(() => {
			handleNewSurvey();
		}, timeoutTime);
	}, []);

	const handleAddAnswer = async (formData: any, qid: any) => {
		if (!question || !sid) {
			console.log('No question or sid to answer');
			return;
		}

		const answer = {
			question: question.question,
			answer: formData[`${qid}`],
			qid: qid,
			sid: sid,
		};

		setQuestion(undefined);

		setTimeout(async () => {
			const { data, error } = await addAnswer(answer);
			if (error) {
				toast.error(error);
				setQuestion(error);
			} else if (data.rid) {
				setQuestion(undefined);
				console.log(data)
				setRid(data);
			} else {
				setQuestion(data);
			}
		}, timeoutTime);
	};

	if (rid) {
		return (
			<Layout>
				<div className='text-2xl mt-32 flex space-y-3 flex-col justify-center items-center'>
					<p className='font-bold text-2xl'>Submission Success!</p>
					<Link
						className='action-item text-dark font-bold w-32 text-center'
						href={`/report?id=${rid}`}
					>
						View Results
					</Link>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<h2 className='font-bold text-2xl text-center'>Survey</h2>
			<div
				className={`border shadow-xl rounded-xl my-10 py-4 md:py-8 px-7 md:px-14`}
			>
				<div
					className={`${
						question ? 'hidden' : ''
					} animate-pulse py-32 flex justify-center items-center flex-col space-y-5`}
				>
					<FaSpinner size={40} className='animate-spin' />
					<p>LOADING</p>
				</div>
				{question && (
					<form
						// className={`${question ? '' : 'hidden'}`}
						onSubmit={handleSubmit(
							async (data) =>
								await handleAddAnswer(data, question?.qid)
						)}
					>
						<div className='mb-10'>
							<p>
								{question?.qid}. {question?.question}
							</p>
							<textarea
								className='px-3 py-2 rounded-lg'
								{...register(`${question?.qid}`, {
									required: true,
								})}
							/>
							{errors[`${question?.qid}`] && (
								<p>Unanswered question</p>
							)}
						</div>
						<div className='inline-flex justify-center items-center w-full mt-10'>
							<button
								className='action-item text-dark font-bold w-32'
								type='submit'
							>
								Next
							</button>
						</div>
					</form>
				)}
			</div>
		</Layout>
	);
};

export default SurveyPage;

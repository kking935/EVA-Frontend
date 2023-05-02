import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { createSurvey, addAnswer } from '../services/backend.service';
import { toast } from 'react-toastify';
import LoadingIcon from '../components/LoadingIcon';

const timeoutTime = 500;

const SurveyPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [report, setReport] = useState<ReportsModel>();
	const [sid, setSid] = useState<string>();
	const [question, setQuestion] = useState<SurveyQuestion>();
	const [numQuestions, setNumQuestions] = useState<number>(0);

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
					setNumQuestions(Object.keys(data.survey).length);
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
		setNumQuestions(numQuestions - 1);

		setTimeout(async () => {
			const { data, error } = await addAnswer(answer);
			if (error) {
				toast.error(error);
				setQuestion(error);
			} else if (data.rid) {
				setQuestion(undefined);
				console.log(data);
				setReport(data);
			} else {
				setQuestion(data);
			}
		}, timeoutTime);
	};

	if (report) {
		return (
			<Layout>
				<div className='text-2xl mt-32 flex space-y-3 flex-col justify-center items-center'>
					<p className='font-bold text-2xl'>Submission Success!</p>
					<Link
						className='action-item text-dark font-bold w-32 text-center'
						href={`/report?id=${report.rid}`}
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
				<LoadingIcon loading={!question} />
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

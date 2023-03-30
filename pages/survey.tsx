import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { postSurvey } from '../services/users.service';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import questions from '../data/short_questions.json';

const SurveyPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { getAccessTokenSilently, user, isAuthenticated, loginWithRedirect } =
		useAuth0();
	const handleSignUp = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/survey',
			},
			authorizationParams: {
				prompt: 'login',
				screen_hint: 'signup',
			},
		});
	};

	const [rid, setRid] = useState(null);
	const [loading, setLoading] = useState(false);

	const uploadAnswers = async (formData: any) => {
		setLoading(true);
		console.log(formData);
		const entries = [];
		for (const id in formData) {
			entries.push({
				question: questions[parseInt(id)].question,
				answer: formData[id],
				question_id: parseInt(id),
			});
		}
		console.log(entries);

		const accessToken = await getAccessTokenSilently();
		const { data, error } = await postSurvey(
			accessToken,
			user?.sub as string,
			entries
		);
		console.log('Server responded with data: ', data, 'and error: ', error);
		setLoading(false);

		if (error) {
			toast.error(error);
			setRid(error);
			return;
		}

		setRid(data);
	};

	return (
		<Layout>
			<h2 className='font-bold text-2xl text-center'>Survey</h2>
			{isAuthenticated ? (
				loading ? (
					<div className='w-32 h-32 mx-auto text-primary bg-primary font-bold text-2xl mt-32 pt-32 px-32 pb-24 shadow-lg rounded-xl flex flex-col items-center justify-center'>
						<div className='animate-pulse flex justify-center items-center flex-col space-y-5'>
							<FaSpinner size={40} className='animate-spin' />
							<p>SUBMITTING</p>
						</div>
					</div>
				) : rid ? (
					<div className='text-2xl mt-32 flex space-y-3 flex-col justify-center items-center'>
						<p className='font-bold text-2xl'>
							Submission Success!
						</p>
						<Link
							className='action-item text-dark font-bold w-32 text-center'
							href={`/report?id=${rid}`}
						>
							View Results
						</Link>
					</div>
				) : (
					<form
						className='border shadow-xl rounded-xl my-10 py-4 md:py-8 px-7 md:px-14'
						onSubmit={handleSubmit(
							async (data) => await uploadAnswers(data)
						)}
					>
						{questions.map((question, index) => {
							return (
								<div className='mb-10' key={`${index}`}>
									<p>
										{index + 1}. {question.question}
									</p>
									<textarea className='px-3 py-2 rounded-lg'
										{...register(`${index}`, {
											required: true,
										})}
									/>
									{errors[`${index}`] && (
										<p>Unanswered question</p>
									)}
								</div>
							);
						})}
						<div className='inline-flex justify-center items-center w-full mt-10'>
							<button
								className='action-item text-dark font-bold w-32'
								type='submit'
							>
								Submit
							</button>
						</div>
					</form>
				)
			) : (
				<div className='flex justify-center items-center mt-16'>
					<button
						onClick={handleSignUp}
						className='action-item font-bold text-dark'
					>
						Sign Up To Take Survey
					</button>
				</div>
			)}
		</Layout>
	);
};

export default SurveyPage;

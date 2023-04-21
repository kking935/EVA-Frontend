import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getQuestions } from '../../services/users.service';
import { FaChevronRight } from 'react-icons/fa';

// export const getStaticProps = async () => {
//   const questions = await getQuestions();
//   return {
//     props: {
//       questions,
//     },
//   };
// };

const QuestionCard = ({ question }: { question: Question }) => {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<>
			<li key={`question-${question.question_id}`} className='mb-5'>
				<div className='flex flex-row'>
					<p className=''>
						{question.question} (ID: {question.question_id})
					</p>
					<div className='flex-grow' />
					<button
						className={`w-5 h-5 flex justify-center items-center text-black font-bold  p-5 ml-5 rounded-md transition transform duration-200 ease-in-out ${
							collapsed ? 'rotate-0' : 'rotate-90'
						}`}
						onClick={() => setCollapsed(!collapsed)}
					>
						<p>
							<FaChevronRight />
						</p>
					</button>
				</div>
				<table
					className={`${
						collapsed ? 'hidden' : ''
					}  text-center border border-gray-500 w-full`}
				>
					<thead>
						<tr className='bg-blue-200 text-black font-extrabold border-gray-400 border'>
							<th className='w-10 px-3 border-r border-inherit'>
								ID
							</th>
							<th className='w-2/5 text-left pl-3 border-r border-inherit'>
								Domain
							</th>
							<th className='flex-grow text-left pl-3'>
								Subdomains
							</th>
						</tr>
					</thead>
					<tbody>
						{question?.sdoh_domains?.map((domain: any) => (
							<>
								<tr
									key={`domain-${domain.domain_id}`}
									className='h-10 bg-blue-300 text-black border border-gray-400 font-bold'
								>
									<td className='border-r border-gray-400'>
										{domain.domain_id}
									</td>
									<td className='text-left pl-3 border-r border-gray-400'>
										{domain.domain}
									</td>
									<td></td>
								</tr>
								{domain.subdomains.map((subdomain: any) => (
									<tr
										key={`subdomain-${subdomain.subdomain_id}`}
										className='h-10 font-medium border border-gray-400'
									>
										<td className='border-r border-gray-400'>
											{subdomain.subdomain_id}
										</td>
										<td className='border-r border-gray-400'></td>
										<td className='text-left pl-3'>
											{subdomain.subdomain}
										</td>
									</tr>
								))}
							</>
						))}
					</tbody>
				</table>
			</li>
		</>
	);
};

// const QuestionsPage = ({ questions }: Props) => {
const QuestionsPage = () => {
	const [questions, setQuestions] = useState<QuestionsModel[]>([]);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getQuestions();
			if (error) {
				console.log(error);
				return;
			}
			setQuestions(data);
		}

		fetchData();
	}, []);

	return (
		<Layout>
			<div className='flex flex-col'>
				<h2 className='font-bold text-2xl text-center'>Questions</h2>
				<hr className='my-5' />
				<ol className='list-decimal'>
					{questions?.map((question: QuestionsModel) => (
						<QuestionCard
							key={`question-wrapper-${question.qid}`}
							question={question}
						/>
					))}
				</ol>
			</div>
		</Layout>
	);
};

export default QuestionsPage;

import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getQuestions } from '../../services/backend.service';
import { FaChevronRight } from 'react-icons/fa';
import LoadingIcon from '../../components/LoadingIcon';
import { DisplayLabelIcon } from '../../components/LabelCard';

// export const getStaticProps = async () => {
// 	const { data, error } = await getQuestions();
// 	if (error) {
// 		console.log(error);
// 	}
// 	return {
// 		props: {
// 			questions: data,
// 		},
// 	};
// };

const QuestionCard = ({ question }: { question: QuestionsModel }) => {
	return (
		<>
			<li
				key={`question-${question.qid}`}
				className='mb-5 shadow-lg p-3 rounded-xl'
			>
				<p>
					{question.qid}.{question.question}
				</p>
				<div className='flex flex-row justify-start items-center flex-wrap'>
					{question.labels?.map((label: LabelsModel) =>
						label.sublabels.map((sublabel: SublabelModel) => (
							<DisplayLabelIcon
								key={label.label + sublabel.sublabel}
								label={label.label}
								sublabel={sublabel.sublabel}
							/>
						))
					)}
				</div>
			</li>
		</>
	);
};

// const QuestionsPage = ({ questions }: { questions: QuestionsModel[] }) => {
const QuestionsPage = () => {
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState<QuestionsModel[]>([]);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getQuestions();
			if (error) {
				console.log(error);
				setLoading(false);
				return;
			}
			data.sort(
				(a: QuestionsModel, b: QuestionsModel) =>
					parseInt(a.qid) - parseInt(b.qid)
			);
			setQuestions(data);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<Layout>
			<div className='flex flex-col'>
				<h2 className='font-bold text-2xl text-center'>Questions</h2>
				<hr className='my-5' />
				<ul>
					{questions ? (
						questions?.map((question: QuestionsModel) => (
							<QuestionCard
								key={`question-wrapper-${question.qid}`}
								question={question}
							/>
						))
					) : loading ? (
						<LoadingIcon loading />
					) : (
						<p className='text-center'>No questions found</p>
					)}
				</ul>
			</div>
		</Layout>
	);
};

export default QuestionsPage;

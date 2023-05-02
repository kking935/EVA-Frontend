import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getLabels } from '../../services/backend.service';
import LoadingIcon from '../../components/LoadingIcon';
import { DisplayLabelIcon } from '../../components/LabelCard';
import Link from 'next/link';

// export const getStaticProps = async () => {
// 	console.log('fetching...')
// 	const { data, error } = await getLabels();
// 	console.log(data)
// 	if (error) {
// 		console.log(error);
// 	}
// 	return {
// 		props: {
// 			labels: data,
// 		},
// 	};
// };

const LabelTable = ({ label }: { label: LabelsModel }) => {
	return (
		<div className='w-full p-3 rounded-xl shadow-lg '>
			{/* <DisplayLabelIcon label={label.label} sublabel={label.label} /> */}
			<h3 className='text-lg font-semibold mb-2'>{label.label}</h3>
			<div className='flex flex-row justify-start items-center flex-wrap'>
				{label.sublabels.map((sublabel) => (
					<DisplayLabelIcon
						key={label.label + sublabel.sublabel}
						label={label.label}
						sublabel={sublabel.sublabel}
					/>
				))}
			</div>
		</div>
	);
};

const LabelsPage = () => {
	//{ labels }: { labels: LabelsModel[] }) => {
	const [loading, setLoading] = useState(true);
	const [labels, setLabels] = useState<LabelsModel[]>();

	useEffect(() => {
		const fetchLabels = async () => {
			console.log('fetching...');
			const { data, error } = await getLabels();
			console.log(data);
			if (error || !data) {
				console.log(error);
				setLoading(false);
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
			setLabels(data);
			setLoading(false);
		};
		fetchLabels();
	}, []);

	return (
		<Layout>
			<div className='flex items-center justify-center space-x-5'>
				<h2 className='font-bold text-2xl text-center'>Risks</h2>
			</div>
			<p>Our survey asks focused questions designed to reveal specific aspects of a patient{"'"}s <b>Social Determinants of Health</b>. <Link className='underline text-blue-800' href='https://health.gov/healthypeople/priority-areas/social-determinants-health' target='__blank'>As defined</Link> by the  U.S. Deparment of Health and Human Services, </p>
			<p className='italic mx-5 bg-gray-200 p-3 rounded-xl shadow-lg mt-3 mb-8'>{'"'}<b>Social determinants of health (SDOH)</b> are the conditions in the environments where people are born, live, learn, work, play, worship, and age that affect a wide range of health, functioning, and quality-of-life outcomes and risks.{'"'}</p>
			<p className='pb-5 border-b'>The domains can be categorized as follows: </p>
			<div className='flex flex-col space-y-8'>
				{labels ? (
					labels.map((item, idx) => (
						<LabelTable key={`label-${idx}`} label={item} />
					))
				) : loading ? (
					<LoadingIcon loading />
				) : (
					<p className='text-center'>No labels found</p>
				)}
			</div>
		</Layout>
	);
};
export default LabelsPage;

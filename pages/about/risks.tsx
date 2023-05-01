import Layout from '../../components/Layout';
import { getLabels } from '../../services/backend.service';

export const getStaticProps = async () => {
	console.log('fetching...')
	const { data, error } = await getLabels();
	console.log(data)
	if (error) {
		console.log(error);
	}
	return {
		props: {
			labels: data,
		},
	};
};

const LabelTable = ({ label }: { label: LabelsModel }) => {
	return (
		<table className='border border-white w-full'>
			<thead>
				<tr className='h-10 font-bold bg-blue-200 text-black border-b'>
					<th className='px-3 border-r w-16'>ID: {label.lid}</th>
					<th className='text-left pl-3'>{label.label}</th>
				</tr>
			</thead>

			<tbody>
				{label.sublabels.map((sublabel) => (
					<tr
						key={label.lid + sublabel.slid}
						className='border-b h-10 font-medium'
					>
						<td className='text-center px-3 border-r'>
							{sublabel.slid}
						</td>
						<td className='pl-3'>{sublabel.sublabel}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const LabelsPage = ({ labels }: { labels: LabelsModel[] }) => {
	return (
		<Layout>
			<div className='flex items-center justify-center space-x-5'>
				<h2 className='font-bold text-2xl text-center'>Labels</h2>
			</div>
			<hr className='my-5' />
			<div className='flex flex-col space-y-10'>
				{labels ? (
					labels.map((item, idx) => (
						<LabelTable key={`label-${idx}`} label={item} />
					))
				) : (
					<p className='text-center'>No labels found</p>
				)}
			</div>
		</Layout>
	);
};
export default LabelsPage;

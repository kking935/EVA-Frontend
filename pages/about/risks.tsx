import { FaExclamationTriangle, FaTags } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { getLabels } from '../../services/backend.service';

export const getStaticProps = async () => {
	const { data, error } = await getLabels();
	if (error) {
		console.log(error);
	}
	return {
		props: {
			risks: data,
		},
	};
};

const RiskTable = ({ risk }: { risk: Risk }) => {
	return (
		<table className='border border-white w-full'>
			<thead>
				<tr className='h-10 font-bold bg-blue-200 text-black border-b'>
					<th className='px-3 border-r w-16'>ID: {risk.domain_id}</th>
					<th className='text-left pl-3'>{risk.domain}</th>
				</tr>
			</thead>

			<tbody>
				{risk.subdomains.map((subdomain) => (
					<tr
						key={risk.domain_id + subdomain.subdomain_id}
						className='border-b h-10 font-medium'
					>
						<td className='text-center px-3 border-r'>
							{subdomain.subdomain_id}
						</td>
						<td className='pl-3'>{subdomain.subdomain}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const RisksPage = ({ risks }: { risks: Risk[] }) => {
	return (
		<Layout>
			<div className='flex items-center justify-center space-x-5'>
				<FaExclamationTriangle size={25} />
				<h2 className='font-bold text-2xl text-center'>Risks</h2>
				<FaExclamationTriangle size={25} />
			</div>
			<hr className='my-5' />
			<div className='flex flex-col space-y-10'>
				{risks ? (
					risks.map((item, idx) => (
						<RiskTable key={`domain-${idx}`} risk={item} />
					))
				) : (
					<p className='text-center'>No risks found</p>
				)}
			</div>
		</Layout>
	);
};
export default RisksPage;

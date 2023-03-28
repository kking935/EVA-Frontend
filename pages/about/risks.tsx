import Layout from "../../components/Layout";
import sdoh_domains from "../../data/domains.json";

interface Props {
  domains: Risk[];
}

export const getStaticProps = async () => {
  return {
    props: {
      domains: sdoh_domains,
    },
  };
};

const RiskTable = ({ domain }: { domain: Risk }) => {
  return (
    <table className="border border-white w-full">
      <thead>
        <tr className="h-10 font-bold bg-blue-300 text-black border-b">
          <th className="px-3 border-r w-16">ID: {domain.domain_id}</th>
          <th className="text-left pl-3">{domain.domain}</th>
        </tr>
      </thead>

      <tbody>
        {domain.subdomains.map((subdomain) => (
          <tr
            key={domain.domain_id + subdomain.subdomain_id}
            className="border-b h-10 font-medium"
          >
            <td className="text-center px-3 border-r">{subdomain.subdomain_id}</td>
            <td className="pl-3">{subdomain.subdomain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RisksPage = ({ domains }: Props) => {
  return (
    <Layout>
      <h2 className="font-bold text-2xl text-center">Risks</h2>
      <hr className="my-5" />
      <div className="flex flex-col space-y-10">
        {domains.map((item, idx) => (
          <RiskTable key={`domain-${idx}`} domain={item} />
        ))}
      </div>
    </Layout>
  );
};
export default RisksPage;

import Layout from "../../components/Layout";
import sdoh_domains from "../../data/domains.json";

interface Props {
  domains: Domain[];
}

export const getStaticProps = async () => {
  return {
    props: {
      domains: sdoh_domains,
    },
  };
};

const DomainTable = ({ domain }: { domain: Domain }) => {
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
            key={subdomain.subdomain_id}
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

const DomainsPage = ({ domains }: Props) => {
  return (
    <Layout>
      <h2 className="font-bold text-2xl text-center">Domains</h2>
      <hr className="my-5" />
      <div className="flex flex-col space-y-10">
        {domains.map((item, idx) => (
          <DomainTable key={`domain-${idx}`} domain={item} />
        ))}
      </div>
    </Layout>
  );
};
export default DomainsPage;

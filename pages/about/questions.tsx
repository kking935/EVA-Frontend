import { useState } from "react";
import Layout from "../../components/Layout";
import sdoh_questions from "../../data/questions.json";

interface Props {
  questions: Question[];
}

export const getStaticProps = async () => {
  return {
    props: {
      questions: sdoh_questions,
    },
  };
};

const QuestionCard = ({ question }: { question: Question }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <li className="mb-5">
        <div className="flex flex-row">
          <p className=" font-semibold italic ">
            {question.question} (ID: {question.question_id})
          </p>
          <div className="flex-grow" />
          <button
            className={`w-5 h-5 flex justify-center items-center text-black font-bold bg-blue-300 p-5 ml-5 rounded-md transition transform duration-100 ease-in ${
              collapsed ? "rotate-0" : "rotate-90"
            }`}
            onClick={() => setCollapsed(!collapsed)}
          >
            {">"}
          </button>
        </div>
        <table
          className={`${collapsed ? "hidden" : ""}  text-center border border-gray-500 w-full`}
        >
          <thead>
            <tr className="bg-blue-400 text-black font-extrabold border-gray-400 border">
              <th className="w-10 px-3 border-r border-inherit">ID</th>
              <th className="w-2/5 text-left pl-3 border-r border-inherit">Domain</th>
              <th className="flex-grow text-left pl-3">Subdomains</th>
            </tr>
          </thead>
          <tbody>
            {question.sdoh_domains.map((domain) => (
              <>
                <tr
                  key={domain.domain_id}
                  className="h-10 bg-blue-300 text-black border border-gray-400 font-bold"
                >
                  <td className="border-r border-gray-400">
                    {domain.domain_id}
                  </td>
                  <td className="text-left pl-3 border-r border-gray-400">
                    {domain.domain}
                  </td>
                  <td></td>
                </tr>
                {domain.subdomains.map((subdomain) => (
                  <tr className="h-10 font-medium border border-gray-400" key={subdomain.subdomain_id}>
                    <td className="border-r border-gray-400">
                      {subdomain.subdomain_id}
                    </td>
                    <td className="border-r border-gray-400"></td>
                    <td className="text-left pl-3">
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

const QuestionsPage = ({ questions }: Props) => {
  return (
    <Layout>
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl text-center">
          Questions
        </h2>
        <hr className="my-5" />
        <ol className="list-decimal">
          {questions.map((question) => (
            <QuestionCard key={question.question_id} question={question} />
          ))}
        </ol>
      </div>
    </Layout>
  );
};

export default QuestionsPage;

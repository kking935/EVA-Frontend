import React from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import Chatbot from "../components/Modes/Chatbot";
import Playground from "../components/Modes/Playground";
import Summarize from "../components/Modes/Summarize";
import Survey from "../components/Modes/Survey";

const PlaygroundPage: React.FC = () => {
  const views = [
    {name: 'Summary', component: <Summarize key={0} />},
    {name: 'Survey', component: <Survey key={1} />},
    {name: 'Chatbot', component: <Chatbot key={2} />},
    {name: 'Playground', component: <Playground key={3} />},
  ]
  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <Layout>
      <select className='blue-select' value={selectedOption} onChange={handleChange}>
        {views.map((view, index) => (
          <option key={view.name} value={index}>
            {view.name} Mode
          </option>
        ))}
      </select>

      {
        views[selectedOption].component
      }
    </Layout>
  );
};

export default PlaygroundPage;

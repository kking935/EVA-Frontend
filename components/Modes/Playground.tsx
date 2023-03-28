import React from 'react';
import { useState } from 'react';
import { handleSendPrompt } from '../../utils/handlers';

const Playground = () => {
  const [promptQuestion, setPromptQuestion] = useState('Does the following patient response indicate one or more social risk factors. List the potential social risk factors and explain your reasoning for each in detail: ');
  const [patientExample, setPatientExample] = useState('');
  const [response, setResponse] = useState('');

  const handlePromptQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptQuestion(event.target.value);
  }

  const handlePatientExampleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatientExample(event.target.value);
  }

  const handleSubmit = async () => {
    const text = await handleSendPrompt(promptQuestion + " " + patientExample)
    setResponse(text)
  }  

  return (
    <div>
        <p className='p-3'>In this mode, you can modify the initial message given to GPT-3. In the example below, we tell GPT-3 that we want it to look for social risk factors. If you change the message, you can see that the output may change noticeably depending on what you initially told GPT-3.</p>
        <h3>GPT Initialization:</h3>
        <textarea className='bg-gray-100 font-bold' value={promptQuestion} onChange={handlePromptQuestionChange}></textarea>
        <h3>Message:</h3>
        <textarea placeholder="Enter a message to send to GPT-3 (ex. a patient response)" onChange={handlePatientExampleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <hr></hr>
        <p>Response:</p>
        <p className='w-full bg-yellow p-3 border mt-2 mb-4'>{response ? response : ''}</p>
        <p className='italic text-sm mb-3'>Note: play around with different prompt questions and example responses to see how the text-davinci-003 model words its answers differently. 
        When you click submit, it will combine the prompt question and the patient response. 
        <br /><br />
        Ex: Full question sent to GPT = (prompt question) &quot;Does this response indicate homelessness: &quot; + (patient response) &quot;I am homeless&quot;</p>
    </div>
  );
}

export default Playground;

import React from 'react';
import { useState } from 'react';
import { handleSendPrompt } from '../../utils/handlers';

type QuestionProps = {
  isEditable: boolean,
  label: string;
  idx: number
};

const Question = ({ isEditable, label, idx }: QuestionProps) => {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState(label)

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };
  
  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  return (
    <>
      <div className='mt-1'>
        {isEditable ?
          <input type="text" name={`question-edit-${idx}`} value={question} onChange={handleChangeQuestion} /> :
          <label htmlFor={`question-${idx}`}>{question}</label>
        }
      </div>
      <textarea name={`answer-${idx}`} id={`question-${idx}`} value={answer} onChange={handleChangeAnswer} />
    </>
  );
}


const Survey = () => {
  const [promptEdits, setPromptEdits] = useState(false);
  const [promptQuestion, setPromptQuestion] = useState('I am going to provide you with a series of survey questions and patient responses. If the response for a question indicates one or more social risk factors, please list that question number and the potential social risk factors: ');
  const [newQuestion, setNewQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [surveyQuestions, setSurveyQuestions] = useState([
    "What is your current housing situation?",
    "What is your primary source of income?",
    "What is your level of education?",
  ])

  const handlePromptQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptQuestion(event.target.value);
  }

  const handleSubmit = async () => {
    const questionAnswers = getQuestionsAndAnswers();
    const text = await handleSendPrompt(promptQuestion + " " + questionAnswers)
    setResponse(text)
  }  

  const togglePromptEdits = () => {
    setPromptEdits(!promptEdits)
  }

  const getQuestionsAndAnswers = (): string => {
    // Get the form element
    const form = document.querySelector("form");
    if (form == null) return '';

    // Initialize an empty string to store the combined questions and answers
    let combined = "";
    let curQuestion = 0;

    // Loop through all of the child elements of the form
    for (let i = 0; i < form.children.length; i++) {
      // Get the current child element
      const child = form.children[i];
      
      // Check if the child element is a textarea
      if (child.tagName === "TEXTAREA") {
        curQuestion += 1
        // Get the question and answer for this textarea element
        const question = (child.previousElementSibling as HTMLElement).innerText;
        const answer = (child as HTMLTextAreaElement).value;
  
        // Add the question and answer to the combined string
        combined += (curQuestion) + "- " + question + ": " + answer + "\n";
      }
    }
    console.log(combined)
    // Return the combined string
    return combined;
  }

  const handleChangeNewQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(event.target.value)
  }
  
  const handleNewQuestion = () => {
    setSurveyQuestions([...surveyQuestions, newQuestion])
    setNewQuestion('')
  }

  return (
    <div>
        <p className='p-3'>In this mode, you can fill out a demo survey and see the results. You can also toggle the edit on so you can modify the questions and the GPT Initialization (see playground for description of this).</p>
        <button className='toggleEditButton' onClick={togglePromptEdits}>Toggle prompt edits</button>
        {
          promptEdits ?
          <>
            <h3>GPT Initialization:</h3>
            <textarea className='bg-gray-100 font-bold' value={promptQuestion} onChange={handlePromptQuestionChange}></textarea>
          </> : null
        }
        <form>
          {surveyQuestions.map((question, idx) => <Question key={`question-answer-${idx}`} isEditable={promptEdits} label={question} idx={idx} />)}
        </form>
        {
          promptEdits ?
          <div>
            <h3>Add Question:</h3>
            <input type="text" name='new-question' value={newQuestion} onChange={handleChangeNewQuestion} /> 
            <button onClick={handleNewQuestion}>Add question</button>
          </div> : null
        }
        {
          promptEdits ? null : <button onClick={handleSubmit}>Submit</button>
        }
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

export default Survey;

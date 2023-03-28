import React, { useEffect, useState } from "react";
import { handleSendPrompt } from "../../utils/handlers";

type Message = {
  text: string;
  fromGPT: boolean
};

const initialPrompt = 'Your name is GPT-3. Each time you respond, start your message with "GPT-3: ". DO NOT ANSWER FOR ME! Never attempt to predict what I am going to say. If I do not complete my sentence during a response, ask me to finish my sentence. I want you to ask me questions to determine if I have any social risk factors. There are five categories of social risk factors- Economic Stability, Education Access and Quality, Health Care Access and Quality, Neighborhood and Built Environment, Social and Community Context. Ask questions targeting each of the 5 categories, and continue asking questions until you have a strong indication of whether the category is a social risk factor or not. At the end, summarize which social risk factors seem to be present. Ask one question at a time. Start by introducing yourself then ask me if I am ready. When I say okay, start asking your first question.\n'

function Chatbot() {
  // const oldPromptQuestion = 'Me: Your name is GPT-3. Each time you respond, please start your message with "GPT-3: " I want you to ask me questions to determine if I have any social risk factors. There are five categories of social risk factors- Economic Stability, Education Access and Quality, Health Care Access and Quality, Neighborhood and Built Environment, Social and Community Context. Please ask questions targeting each of the 5 categories, and continue asking questions until you have a strong indication of whether the category is a social risk factor or not. At the end, summarize which social risk factors seem to be present. Ask one question at a time. Start by introducing yourself then ask me if I am ready. When I say okay, start asking your first question.\n'
  // const [input, setInput] = useState("");
  // useEffect(() => {
  //   async function fetchApi() {
  //     const response = await handleSendPrompt(promptQuestion)
  //       setConversationHistory(`${promptQuestion}${response}\n`)
  //       setMessages([{ text: promptQuestion, fromGPT: false }, { text: response, fromGPT: true }]);
  //   }
  //   fetchApi()
  // }, []);

  const [input, setInput] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newConversationHistory = `${conversationHistory}\nMe: ${input}\n`
    const newMessages = [...messages, { text: `Me: ${input}`, fromGPT: false }]
    setMessages(newMessages);
    setInput("");

    const response = await handleSendPrompt(newConversationHistory);
    newConversationHistory = `${newConversationHistory}\n${response}\n`
    setConversationHistory(newConversationHistory)
    console.log('conversation: \n\n', newConversationHistory)

    setMessages([...newMessages, { text: response, fromGPT: true}]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <p className={`${message.fromGPT ? 'bg-blue-300 font-bold' : 'bg-gray-300'} p-3`} key={index}>{message.text}</p>
        ))}
      </div>
      <form className="flex flex-row justify-center items-center" onSubmit={handleSubmit}>
        <textarea className=" h-min" value={input} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;

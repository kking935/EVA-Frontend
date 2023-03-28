import React, { useEffect, useState } from "react";

type Message = {
  text: string;
  fromGPT: boolean
};

interface PlaygroundProps {
  queryGPT3: any;
}

const promptQuestion = 'Me: Your name is GPT-3. Each time you respond, please start your message with "GPT-3: " I want you to ask me questions to determine if I have any social risk factors. There are five categories of social risk factors- Economic Stability, Education Access and Quality, Health Care Access and Quality, Neighborhood and Built Environment, Social and Community Context. Please ask questions targeting each of the 5 categories, and continue asking questions until you have a strong indication of whether the category is a social risk factor or not. At the end, summarize which social risk factors seem to be present. Ask one question at a time. Start by introducing yourself then ask me if I am ready. When I say okay, start asking your first question.\n'

function Chatbot({queryGPT3}: PlaygroundProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState('')

  useEffect(() => {
    async function fetchApi() {
        const response = await queryGPT3(promptQuestion, 0.1, 0.9, 200);
        setConversationHistory(`${promptQuestion}${response}\n`)
        setMessages([{ text: promptQuestion, fromGPT: false }, { text: response, fromGPT: true }]);
    }
    fetchApi()
  }, [queryGPT3]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newConversationHistory = `${conversationHistory}\nMe: ${input}\n`
    const newMessages = [...messages, { text: `Me: ${input}`, fromGPT: false }]
    setMessages(newMessages);
    setInput("");

    const response = await queryGPT3(newConversationHistory, 0.7, 0.9, 200);
    newConversationHistory = `${newConversationHistory}\n${response}\n`
    setConversationHistory(newConversationHistory)
    console.log('conversation: \n\n', newConversationHistory)

    setMessages([...newMessages, { text: response, fromGPT: true}]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <input className="h-32 px-3" type="text" value={input} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;

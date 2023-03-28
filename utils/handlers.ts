import { CreateCompletionResponse } from "openai";
import { CreateCompletionRequest } from "openai/dist/api";

// TODO: Add error handling
export const handleSendPrompt = async (prompt: string, options?: any): Promise<string> => {
  const ccRequestObj: CreateCompletionRequest = {
    prompt,
    ...options
  }
  console.log('Sending create completion request to api endpoint: ', ccRequestObj)
  
  const response: CreateCompletionResponse = await fetch("../api/sendPrompt", {
    method: "POST",
    body: JSON.stringify(ccRequestObj),
  }).then((res) => res.json());

  console.log('The prompt response is: ', response)

  if (response?.choices?.length > 0 && response.choices[0].text) {
    const text = response.choices[0].text
    console.log('Returning text of first choice: ', text)
    return text
  }
  return 'No response received'
};

export const handleSummaryRequest = async (fullText: string, endpointName: string): Promise<string> => {
  const data = await fetch("../api/summarize", {
    method: "POST",
    body: JSON.stringify({fullText, endpointName}),
  }).then((res) => res.json());

  const summary = data.summary_text
  console.log('The summary is: ', summary)
  return summary
}
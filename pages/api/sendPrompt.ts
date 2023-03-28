import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { CreateCompletionRequest } from "openai/dist/api";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Details on parameters: https://beta.openai.com/docs/api-reference/completions/create
const CC_REQUEST_DEFAULTS: CreateCompletionRequest = {
  model: "text-davinci-003",
  temperature: 0.7,
  max_tokens: 50,
  frequency_penalty: 0,
  presence_penalty: 0,
}

export const handleSendPrompt = async (ccRequestObj: any) => {
  const fullRequestObj: CreateCompletionRequest = {
    ...CC_REQUEST_DEFAULTS,
    ...ccRequestObj,
  }
  // console.log('Sending createCompletion request with parameters: ', fullRequestObj)
  return await openai.createCompletion(fullRequestObj)  
}

// TODO: Add error handling
const sendPromptRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = JSON.parse(req.body)
  console.log('the form data is ', formData)
  const response = await handleSendPrompt(formData)
  
  console.log('The response data is: ', response.data)
  return res.status(200).json(response.data);
};

export default sendPromptRequest;

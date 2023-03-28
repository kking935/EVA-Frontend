import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

interface Endpoints {
  [key: string]: string;
}

const endpoints: Endpoints = {
  "bart (free)":
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
  "bart (paid)":
    "https://idwq3agqrgwv6u2t.us-east-1.aws.endpoints.huggingface.cloud",
  "pegusus (free)":
    "https://api-inference.huggingface.co/models/google/pegasus-large",
  "pegusus (paid)":
    "https://eup26iulr8wfiv1o.us-east-1.aws.endpoints.huggingface.cloud",
};

// TODO: Add error handling
const summarize = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  console.log("The body is: ", body);
  const endpoint = endpoints[body.endpointName];
  console.log("The endpoint is: ", endpoint);

  const data: any = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: body.fullText }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log("The response is: ", data);
  return res.status(200).json(data[0]);
};

export default summarize;

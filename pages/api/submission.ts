import { NextApiRequest, NextApiResponse } from "next";
import { handleSendPrompt } from "./sendPrompt";

const decodeForm = (base64EncodedString: string) => {
    try {
        const urlEncodedString = Buffer.from(base64EncodedString, 'base64').toString('utf8');
        const jsonObject: any = {}
        urlEncodedString.split("&").forEach(param => {
            const [key, value] = decodeURIComponent(param.replace(/\+/g, " ")).split("=");
            jsonObject[key] = value;
        });
        return jsonObject;
    } catch (error) {
        return error;
    }
};


const getQuestions = (formData: any) => {
    let questions = []
    
    let i = 1
    while (`question-${i}` in formData) {
        questions.push(formData[`question-${i}`])
        i++
    }
    
    console.log(questions)
}

// TODO: Add error handling
const sendPromptRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    let formData = decodeForm(req.body);
    console.log('the form data is ', req.body)

    let questions = getQuestions(formData)

    // let prompt = 'Does the following text contain any social risk factors? '
    // console.log(formData)
    // prompt += formData.toString()

    // const response = await handleSendPrompt({prompt});
    // const result = response.data.choices[0].text

    let html = 
    `
        <body style="text-align: center; margin-top: 100px;">
            <img src='../images/maslow.png' width="160" height="130" style="border: 1px solid gray; border-radius: 15px; padding: 20px; margin-bottom: 100px;" />
            <pre>Data: ${JSON.stringify(questions)}</pre>
        </body>
    `
    
    return res.status(200).send(html);
};

export default sendPromptRequest;

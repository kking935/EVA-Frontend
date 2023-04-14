const apiServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const sendRequest = async (url: string, options: any) => {
	try {
		console.log("sending to ", apiServerUrl + url)
		const response = await fetch(apiServerUrl + url, options).then(
			(response) => response.json()
		);
		return {
			data: response,
			error: null,
		};
	} catch (error) {
		alert("error!")
		return {
			data: null,
			error: {
				message: (error as Error).message,
			},
		};
	}
};

export const getReport = async (
	reportId: string
): Promise<any> => {
	const endpoint = `/reports/${reportId}`;
	const options = {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Origin: siteUrl
		},
	};
	return await sendRequest(endpoint, options);
};

export const postSurvey = async (
    survey: any
): Promise<any> => {
    const endpoint = `/reports/create`;
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
			Origin: siteUrl
        },
        body: JSON.stringify(survey),
    };
    return await sendRequest(endpoint, options);
}

export const createSurvey = async (): Promise<{data: SurveyModel | null, error: any}> => {
    const endpoint = `/surveys/new-survey`;
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
			Origin: siteUrl
        },
    };
    return await sendRequest(endpoint, options);
}

export const addAnswer = async (
    answer: AnswerModel,
): Promise<any> => {
    const endpoint = `/surveys/add-answer`;
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
			Origin: siteUrl
        },
        body: JSON.stringify(answer),
    };
    return await sendRequest(endpoint, options);
}
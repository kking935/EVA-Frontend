const apiServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const sendRequest = async (url: string, options: any) => {
	try {
		if (!options['headers']) {
			options['headers'] = {};
		}
		options['headers']['Origin'] = siteUrl;
		options['headers']['content-type'] = 'application/json';
		console.log('sending to ', apiServerUrl + url);
		const response = await fetch(apiServerUrl + url, options).then(
			(response) => response.json()
		);
		return {
			data: response,
			error: null,
		};
	} catch (error) {
		console.log('ERROR: ', error);
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
): Promise<{
	data: ReportsModel | null;
	error: any;
}> => {
	return await sendRequest(`/reports/${reportId}`, {
		method: 'GET',
	});
};

export const getReports = async (): Promise<{
	data: ReportsModel[] | null;
	error: any;
}> => {
	return await sendRequest(`/reports/all`, {
		method: 'GET',
	});
};

export const getQuestions = async (): Promise<{
	data: QuestionsModel[] | null;
	error: any;
}> => {
	return await sendRequest('/questions/all', {
		method: 'GET',
	});
};

export const getLabels = async (): Promise<{
	data: LabelsModel[] | null;
	error: any;
}> => {
	return await sendRequest('/labels/all', {
		method: 'GET',
	});
};

export const postSurvey = async (
	survey: any
): Promise<{
	data: ReportsModel | null;
	error: any;
}> => {
	return await sendRequest('/reports/create', {
		method: 'POST',
		body: JSON.stringify(survey),
	});
};

export const createSurvey = async (): Promise<{
	data: SurveyModel | null;
	error: any;
}> => {
	return await sendRequest('/surveys/new-survey', {
		method: 'POST',
	});
};

export const addAnswer = async (answer: AnswerModel): Promise<any> => {
	return await sendRequest('/surveys/add-answer', {
		method: 'PUT',
		body: JSON.stringify(answer),
	});
};

export const createQuestion = async (question: any): Promise<{
	data: QuestionsModel | null;
	error: any;
}> => {
	return await sendRequest('/questions/create', {
		method: 'POST',
		body: JSON.stringify(question),
	});
};

export const updateQuestion = async (
	quesiton: QuestionsModel
): Promise<{
	data: QuestionsModel | null;
	error: any;
}> => {
	return await sendRequest('/questions/update', {
		method: 'PUT',
		body: JSON.stringify(quesiton),
	});
};

export const deleteQuestion = async (
	quesiton: QuestionsModel
): Promise<{
	data: any;
	error: any;
}> => {
	return await sendRequest(`/questions/delete/${quesiton.qid}`, {
		method: 'DELETE',
	});
};

export const updateReport = async (
	report: ReportsModel
): Promise<{
	data: ReportsModel | null;
	error: any;
}> => {
	return await sendRequest('/reports/update', {
		method: 'PUT',
		body: JSON.stringify(report),
	});
};

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

export const getProtectedResource = async (
	accessToken: string
): Promise<any> => {
	const endpoint = "/api/messages/protected"
    const options = {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
			Origin: siteUrl
		},
	}
    return await sendRequest(endpoint, options);
};

export const getReport = async (
	accessToken: string,
	sub: string,
	reportId: string
): Promise<any> => {
	const endpoint = `/users/${sub}/reports/${reportId}`;
	const options = {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
			Origin: siteUrl
		},
	};
	return await sendRequest(endpoint, options);
};

export const postSurvey = async (
    accessToken: string,
    sub: string,
    survey: any
): Promise<any> => {
    const endpoint = `/users/${sub}/reports/create`;
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
			Origin: siteUrl
        },
        body: JSON.stringify(survey),
    };
    return await sendRequest(endpoint, options);
}
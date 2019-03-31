import { logger } from './logger';

const CON_TIMEOUT = 10000; //10 seconds

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

const jsonRequst = (url: string, method: Method, body: object) =>
	request(url, method, JSON.stringify(body));

const request = (url: string, method: Method, body: string = '') => {
	logger.debug(`Trying to ${method.toString()} ${url} with body: ${body}`);

	return new Promise((resolve, reject) => {
		const timeout = setTimeout(function() {
			reject(new Error('Request timed out'));
		}, CON_TIMEOUT);
		fetch(url, {
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8'
			}),
			method: method.toString(),
			body: body || undefined
		})
			.then(response => {
				clearTimeout(timeout);
				return response;
			})
			.then(r => r.json())
			.then(r => {
				logger.debug(`Response of ${method.toString()} ${url}: `);
				logger.debug(r);
				resolve(r);
			})
			.catch(error => reject(error));
	});
};

export const get = (url: string) => {
	return request(url, Method.GET);
};

export const post = (url: string, json: object) => {
	return jsonRequst(url, Method.POST, json);
};

export const put = (url: string, json: object) => {
	return jsonRequst(url, Method.PUT, json);
};

export const del = (url: string, json: object) => {
	return jsonRequst(url, Method.DELETE, json);
};

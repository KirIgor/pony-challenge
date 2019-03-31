import { logger } from './logger';

const CON_TIMEOUT = 10000; //10 seconds

enum Method {
	GET,
	POST,
	PUT,
	DELETE
}

const request = (url: string, method: Method, json: object = {}) => {
	logger.debug(`Trying to ${method} ${url}`);
	logger.debug(json);

	return new Promise((resolve, reject) => {
		const timeout = setTimeout(function() {
			reject(new Error('Request timed out'));
		}, CON_TIMEOUT);
		fetch(url, {
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8'
			}),
			body: JSON.stringify(json)
		})
			.then(response => {
				clearTimeout(timeout);
				return response;
			})
			.then(r => r.json())
			.catch(error => reject(error));
	});
};

export const get = (url: string) => {
	return request(url, Method.GET);
};

export const post = (url: string, json: object) => {
	return request(url, Method.POST, json);
};

export const put = (url: string, json: object) => {
	return request(url, Method.PUT, json);
};

export const del = (url: string, json: object) => {
	return request(url, Method.DELETE, json);
};

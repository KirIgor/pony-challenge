export const range = (n: number): number[] => Array.from({ length: n }, (v, i) => i);

export const parseQuery = (queryString: string) => {
	const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

	return pairs.reduce((acc: object, cur: string) => {
		const pair = cur.split('=');
		acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
		return acc;
	}, {});
};

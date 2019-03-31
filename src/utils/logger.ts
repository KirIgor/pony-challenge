export interface Logger {
	debug: (message: any) => void;
	info: (message: any) => void;
	warn: (message: any) => void;
	error: (message: any) => void;
}

export let logger: Logger;

if (process.env.NODE_ENV == 'development') {
	logger = {
		debug: msg => console.log(msg),
		info: msg => console.info(msg),
		warn: msg => console.warn(msg),
		error: msg => console.error(msg)
	};
} else if (process.env.NODE_ENV == 'production') {
	logger = {
		debug: msg => {},
		info: msg => console.info(msg),
		warn: msg => console.warn(msg),
		error: msg => console.error(msg)
	};
}

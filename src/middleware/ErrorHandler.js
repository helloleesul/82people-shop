class badRequestError extends Error {
	constructor(message) {
		super(message);
		this.status = 400;
	}
}
class unauthorizedError extends Error {
	constructor(message) {
		super(message);
		this.status = 401;
	}
}

class notFoundError extends Error {
	constructor(message) {
		super(message);
		this.status = 404;
	}
}

class conflictError extends Error {
	constructor(message) {
		super(message);
		this.status = 409;
	}
}

class internalServerError extends Error {
	constructor(message) {
		super(message);
		this.status = 500;
	}
}

const errorHandler = (err, req, res, next) => {
	res.status(err.status).json({
		message: err.message,
	});
};

module.exports = {
	badRequestError,
	unauthorizedError,
	notFoundError,
	conflictError,
	internalServerError,
	errorHandler,
};

/* class badRequestError extends Error {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

class conflictError extends Error {
  constructor(message) {
    super();
    this.statusCode = 409;
    this.message = message;
  }
} */

const errorHandler = (err, req, res, next) => {

    res.status(400).json({ 
      result: 'error', 
      msg: err.message
    });
};

export { errorHandler };


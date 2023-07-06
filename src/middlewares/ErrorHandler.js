// Error require

class badRequestError extends Error {
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
}  
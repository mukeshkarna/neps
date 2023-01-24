export class ApplicationError extends Error {
  constructor(statusCode, message = 'an error occurred', errors) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.errors = errors;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(404, message || 'resource not found');
  }
}

// throw new ApplicationError(
//   401,
//   'invalid token, please log in or sign up'
// );
export default class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super();

    this.statusCode = statusCode || 500;
    this.message = message || 'An error occurred';
  }

  public get getMessage() {
    return this.message;
  }

  get getStatusCode() {
    return this.statusCode;
  }
}

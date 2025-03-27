export class ApiResponse<T = any> {
  constructor(
    public statusCode: number,
    public message: string,
    public body?: T,
    public error?: any,
  ) {}

  static fromResponse<T>(response: any): ApiResponse<T> {
    return new ApiResponse<T>(response.statusCode, response.message, response.body, response.error)
  }

  isSuccess(): boolean {
    return this.error == null
  }
}

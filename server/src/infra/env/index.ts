export class ApiEnv {
  static readonly PORT = process.env.PORT || 3333;
  static readonly NODE_ENV = process.env.NODE_ENV || "development";
  static readonly BASE_URL =
    process.env.BASE_URL || `http://localhost:${this.PORT}`;
  static readonly USE_MOCKS = !!process.env.USE_MOCKS || false;
}

export default new ApiEnv();

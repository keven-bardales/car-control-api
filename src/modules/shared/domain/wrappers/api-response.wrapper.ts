import { ApiExceptionType } from '@modules/shared/domain/enums/api-exception-type.enum';

interface ApiErrorDetail {
  type: ApiExceptionType;
  message: string;
}

interface ApiResponseProps<T> {
  data?: T | null;
  message?: string;
  statusCode?: number;
  errors?: ApiErrorDetail[];
}

export class ApiResponse<T> {
  public data: T | null;
  public message: string;
  public statusCode: number;
  public errors: ApiErrorDetail[];

  constructor({ data = null, message = '', statusCode = 200, errors = [] }: ApiResponseProps<T>) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static success<T>({
    data,
    message = 'Operation successful',
    statusCode = 200,
  }: {
    data: T;
    message?: string;
    statusCode?: number;
  }): ApiResponse<T> {
    return new ApiResponse<T>({ data, message, statusCode });
  }

  static error<T = null>({
    message = 'An error occurred',
    statusCode = 500,
    errors = [],
  }: {
    message?: string;
    statusCode?: number;
    errors?: ApiErrorDetail[];
  }): ApiResponse<T> {
    return new ApiResponse<T>({ message, statusCode, errors });
  }

  static unauthorized<T = null>({
    message = 'Unauthorized',
    errors = [],
  }: {
    message?: string;
    errors?: ApiErrorDetail[];
  }): ApiResponse<T> {
    return new ApiResponse<T>({ message, statusCode: 401, errors });
  }

  static badRequest<T = null>({
    message = 'Bad request',
    errors = [],
  }: {
    message?: string;
    errors?: ApiErrorDetail[];
  }): ApiResponse<T> {
    return new ApiResponse<T>({ message, statusCode: 400, errors });
  }

  static notFound<T = null>({
    message = 'Resource not found',
    errors = [],
  }: {
    message?: string;
    errors?: ApiErrorDetail[];
  }): ApiResponse<T> {
    return new ApiResponse<T>({ message, statusCode: 404, errors });
  }

  static internalServerError<T = null>({
    message = 'Internal server error',
    errors = [],
  }: {
    message?: string;
    errors?: ApiErrorDetail[];
  }): ApiResponse<T> {
    return new ApiResponse<T>({ message, statusCode: 500, errors });
  }

  static notSuccess<T = null>({}: { message?: string; errors?: ApiErrorDetail[] }): ApiResponse<T> {
    return new ApiResponse<T>({ statusCode: 409 });
  }
}

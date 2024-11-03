import { ApiExceptionType } from '@/modules/shared/domain/enums/api-exception-type.enum';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ApiExceptionProps {
  message: string;
  statusCode: number;
  errors?: any[];
  type: ApiExceptionType;
}

export class ApiException extends Error {
  public statusCode: number;
  public errors?: any[];
  public type: ApiExceptionType;

  constructor(params: ApiExceptionProps) {
    const { message, statusCode, type, errors = [] } = params;

    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.type = type;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestException extends ApiException {
  constructor(params: Pick<ApiExceptionProps, 'message' | 'errors'>) {
    super({ ...params, statusCode: 400, type: ApiExceptionType.BadRequestException });
  }
}

export class NotFoundException extends ApiException {
  constructor(params: Pick<ApiExceptionProps, 'message' | 'errors'>) {
    super({ ...params, statusCode: 404, type: ApiExceptionType.NotFoundException });
  }
}

export class UnauthorizedException extends ApiException {
  constructor(params: Pick<ApiExceptionProps, 'message' | 'errors'>) {
    super({ ...params, statusCode: 401, type: ApiExceptionType.AuthorizationException });
  }
}

export class ForbiddenException extends ApiException {
  constructor(params: Pick<ApiExceptionProps, 'message' | 'errors'>) {
    super({ ...params, statusCode: 403, type: ApiExceptionType.ForbiddenException });
  }
}

export class InternalServerErrorException extends ApiException {
  constructor(params: Pick<ApiExceptionProps, 'message' | 'errors'>) {
    super({ ...params, statusCode: 500, type: ApiExceptionType.InternalServerException });
  }
}

export class ConflictException extends ApiException {
  constructor(params: Pick<ApiExceptionProps, 'message' | 'errors'>) {
    super({ ...params, statusCode: 409, type: ApiExceptionType.ConflictException });
  }
}

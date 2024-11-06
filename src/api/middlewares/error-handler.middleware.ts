/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiExceptionType } from '@/modules/shared/domain/enums/api-exception-type.enum';
import { ApiException } from '@/modules/shared/domain/exceptions/global-exceptions';
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

export const errorHandlingMiddleware = (error: Error, req: Request, res: Response) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json(
      ApiResponse.badRequest({
        message: 'Ha ocurrido un error al validar los datos',
        errors: [],
      }),
    );
  }

  if (error instanceof ApiException) {
    return res.status(error.statusCode).json(
      ApiResponse.badRequest({
        message: error.message,
        errors: error.errors,
      }),
    );
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(500).json(
      ApiResponse.internalServerError({
        message: 'Ha ocurrido un error de base de datos',
        errors: [],
      }),
    );
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return res.status(500).json(
      ApiResponse.badRequest({
        message: 'Ha internalServerError un error de base de datos',
        errors: [],
      }),
    );
  }

  if (error instanceof PrismaClientRustPanicError) {
    return res.status(500).json(
      ApiResponse.internalServerError({
        message: 'Ha ocurrido un error de base de datos',
        errors: [],
      }),
    );
  }

  if (error instanceof PrismaClientInitializationError) {
    return res.status(500).json(
      ApiResponse.internalServerError({
        message: 'Ha ocurrido un error de base de datos',
        errors: [],
      }),
    );
  }

  if (error instanceof PrismaClientValidationError) {
    return res.status(500).json(
      ApiResponse.internalServerError({
        message: 'Ha ocurrido un error de base de datos',
        errors: [],
      }),
    );
  }

  res.status(500).json(
    ApiResponse.internalServerError({
      message: error.message,
      errors: [
        {
          message: 'Ha ocurrido un error en el servidor',
          type: ApiExceptionType.InternalServerException,
        },
      ],
    }),
  );
};

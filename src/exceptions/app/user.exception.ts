import { ApiException } from '@exceptions/app/api.exception';
import { HttpStatus } from '@nestjs/common';

export class UserException extends ApiException {
  /**
   * @param error
   * @returns ApiException
   */
  static notFound(error?: string[]): ApiException {
    throw new ApiException(100001, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static deleteError(error?: string[]): ApiException {
    throw new ApiException(100002, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static createError(error?: string[]): ApiException {
    throw new ApiException(100003, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static updateError(error?: string[]): ApiException {
    throw new ApiException(100004, error);
  }
}

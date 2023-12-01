import { ApiException } from '@exceptions/app/api.exception';
import { HttpStatus } from '@nestjs/common';

export class UserException extends ApiException {
  /**
   * @param error
   * @returns ApiException
   */
  static notFound(error?: string[]): ApiException {
    throw new ApiException(100201, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static deleteError(error?: string[]): ApiException {
    throw new ApiException(100202, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static createError(error?: string[]): ApiException {
    throw new ApiException(100203, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static updateError(error?: string[]): ApiException {
    throw new ApiException(100204, error);
  }
}

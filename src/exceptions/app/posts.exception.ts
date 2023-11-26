import { ApiException } from '@exceptions/app/api.exception';
import { HttpStatus } from '@nestjs/common';

export class PostsException extends ApiException {
  /**
   * @returns ApiException
   */
  static notFound(): ApiException {
    throw new ApiException(100106, [], HttpStatus.OK);
  }
}

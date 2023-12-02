export const ErrorCodes: { [key: number]: string } = {
  0: 'UNDEFINED_ERROR',
  900000: 'PROTOTYPE_ERROR',
  900403: 'UNAUTHORIZED',
  900422: 'VALIDATE_ERROR',
  900423: 'BAD_REQUEST',
  //
  100001: 'EMAIL_OR_PASSWORD_INVALID',
  100002: 'USER_DELETE_ERROR',
  100003: 'USER_CREATE_ERROR',
  100004: 'USER_UPDATE_ERROR',
  100005: 'USER_EXIST',
  //
  100101: 'EXAMPLE_NOT_FOUND',
  100102: 'EXAMPLE_DELETE_ERROR',
  100103: 'EXAMPLE_CREATE_ERROR',
  100104: 'EXAMPLE_UPDATE_ERROR',
  100105: 'EXAMPLE_EXIST',
  //
  100201: 'POSTS_NOT_FOUND',
};

import { Req, Controller, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiResource } from '@common/reponses/api-resource';
import { MyLogger } from '@common/logger/mylogger.service';
import { BackendAuthGuard } from '@common/guards/backend-auth.guard';
import { Roles } from '@common/decorators/roles.decorator';

@UseGuards(BackendAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly myLogger: MyLogger) {}

  @Roles('admin')
  @Get('getprofile')
  async getProfile(@Req() request: Request): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      return ApiResource.successResponse(user);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    username: string;
    role: string;
  };
}

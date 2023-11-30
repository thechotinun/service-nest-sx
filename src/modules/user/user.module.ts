import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { UserRepository } from '@repositories/user.repository';
import { MyLogger } from '@common/logger/mylogger.service';
import { UserController as BackendUserController } from './controller/user.controller';
import { UserService as BackendUserService } from './services/backend/user.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [BackendUserController],
  providers: [BackendUserService, UserRepository, MyLogger],
  exports: [BackendUserService],
})
export class UserModule {}

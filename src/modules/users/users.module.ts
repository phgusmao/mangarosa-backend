import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersIdExistPipe } from './validate/users-id-exist.pipe';
import { UsersCpfAlreadyExist } from './validate/users-cpf-already-exist.contraint';
import { UsersEmailAlreadyExist } from './validate/users-email-already-exist.contraint';
import { UsersPhoneNumberAlreadyExist } from './validate/users-phone-number-already-exist.contraint';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersIdExistPipe,
    UsersCpfAlreadyExist,
    UsersEmailAlreadyExist,
    UsersPhoneNumberAlreadyExist,
  ],
})
export class UsersModule {}

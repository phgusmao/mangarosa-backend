import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { UserInterface } from './interfaces/user.interface';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UsersService } from './users.service';
import { UsersIdExistPipe } from './validate/users-id-exist.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserInterface[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  async findOne(@Param('id', ParseIntPipe, UsersIdExistPipe) id: number): Promise<UserInterface> {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() userCreate: UserCreateDto,
  ): Promise<{ user: UserInterface; message: string }> {
    return this.usersService.create(userCreate);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id', ParseIntPipe, UsersIdExistPipe) id: number,
      @Body() userUpdate: UserUpdateDto,
  ): Promise<{ user: UserInterface; message: string }> {
    return this.usersService.update(userUpdate, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(
    @Param('id', ParseIntPipe, UsersIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return this.usersService.delete(id);
  }
}

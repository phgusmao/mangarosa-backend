import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserInterface[]> {
    try {
      return await this.usersRepository.find({ relations: ['knowledges'] });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os usuários.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<UserInterface> {
    try {
      return await this.usersRepository.findOneOrFail(id, { relations: ['knowledges'] });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o usuário.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async findByName(name: string, user: UserInterface): Promise<UserInterface> {
    try {
      const id = user.id || 0;
      return await this.usersRepository.findOne({
        where: {
          name,
          id: Not(id),
        },
        select: ['name'],
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string, user: UserInterface): Promise<UserInterface> {
    try {
      const id = user.id || 0;
      return await this.usersRepository.findOne({
        where: {
          email,
          id: Not(id),
        },
        select: ['email'],
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async create(body: UserCreateDto): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity = Object.assign(new UserEntity(), body);
      const user = await this.usersRepository.save(entity);

      return { user, message: 'O usuário foi criado com sucesso.' };
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'Não foi possível criar o usuário.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(body: UserUpdateDto, id: number): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity = Object.assign(new UserEntity(), body);
      await this.usersRepository.save(entity);

      const user = await this.usersRepository.findOne(id);
      return { user, message: 'O usuário foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar o usuário.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.usersRepository.delete(id);
      return { message: 'O usuário foi removido com sucesso' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o usuário.' }, HttpStatus.BAD_REQUEST);
    }
  }
}

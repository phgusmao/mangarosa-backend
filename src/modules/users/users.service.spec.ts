import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserInterface } from './interfaces/user.interface';

describe('UsersService', () => {
  let service: UsersService;
  const id = 1;
  const user: UserInterface = {
    id: 1,
    name: 'Pedro Gusmão',
    cpf: '12345678912',
    email: 'teste@gmail.com',
    phoneNumber: '82999999999',
    status: false,
  };

  const users: UserInterface[] = [user];
  const userCreateDto: UserCreateDto = {
    name: 'Pedro Gusmão',
    cpf: '12345678912',
    email: 'teste@gmail.com',
    phoneNumber: '82999999999',
    status: false,
  };
  const userUpdateDto: UserUpdateDto = {
    id: 1,
    name: 'Pedro Gusmão',
    cpf: '12345678912',
    email: 'teste@gmail.com',
    phoneNumber: '82999999999',
    status: false,
  };

  const mockRepository = {
    getAll: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of users', async () => {
    mockRepository.find.mockResolvedValue(users);
    expect(await service.findAll()).toBe(users);
  });

  it('should return an user', async () => {
    mockRepository.findOneOrFail.mockResolvedValue(user);
    await expect(service.findOne(id)).resolves.toEqual(user);
  });

  it('submitted should be true when create user', async () => {
    const returnMessage = { user, message: 'O usuário foi criado com sucesso.' };
    mockRepository.save.mockResolvedValue(user);
    await expect(service.create(userCreateDto)).resolves.toEqual(returnMessage);
  });

  it('submitted should be true when update user', async () => {
    mockRepository.save.mockResolvedValue(user);
    mockRepository.findOne.mockResolvedValue(user);
    await expect(service.update(userUpdateDto, id)).resolves.toEqual({
      user,
      message: 'O usuário foi atualizado com sucesso.',
    });
  });

  it('submitted should be true when delete user', async () => {
    const returnMessage = { message: 'O usuário foi removido com sucesso' };
    mockRepository.softDelete.mockResolvedValue(user);
    await expect(service.delete(id)).resolves.toEqual(returnMessage);
  });

  it('should return error of users', async () => {
    mockRepository.find.mockRejectedValue(
      new HttpException(
        {
          message: 'Não foi possível encontrar os usuários.',
        },
        HttpStatus.BAD_GATEWAY,
      ),
    );
    await expect(service.findAll()).rejects.toThrow('Não foi possível encontrar os usuários.');
  });

  it('should return an error in find one user', async () => {
    mockRepository.findOneOrFail.mockRejectedValue(
      new HttpException(
        {
          message: 'Não foi possível encontrar o usuário.',
        },
        HttpStatus.BAD_GATEWAY,
      ),
    );
    await expect(service.findOne(id)).rejects.toThrow('Não foi possível encontrar o usuário.');
  });

  it('submitted should be error when create user', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockRejectedValue(
      new HttpException(
        {
          message: 'Não foi possível criar o usuário.',
        },
        HttpStatus.BAD_GATEWAY,
      ),
    );
    await expect(service.create(userCreateDto)).rejects.toThrow(
      'Não foi possível criar o usuário.',
    );
  });

  it('submitted should be error when update user', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockRejectedValue(
      new HttpException(
        {
          message: 'Não foi possível atualizar o usuário.',
        },
        HttpStatus.BAD_GATEWAY,
      ),
    );
    await expect(service.update(userUpdateDto, id)).rejects.toThrow(
      'Não foi possível atualizar o usuário.',
    );
  });

  it('should return an message error of delete user', async () => {
    const returnMessage = { message: 'Não foi possível excluir o usuário.' };
    mockRepository.softDelete.mockRejectedValue(
      new HttpException(returnMessage, HttpStatus.BAD_GATEWAY),
    );
    await expect(service.delete(id)).rejects.toThrow('Não foi possível excluir o usuário.');
  });
});

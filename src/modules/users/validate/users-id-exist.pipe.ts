import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrada',
        `Não foi possível encontrar uma usuário com esse ID: ${id}`,
      );
    }

    return id;
  }
}

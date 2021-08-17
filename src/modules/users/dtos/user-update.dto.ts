import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserKnowledgeDto } from './user-knowledge.dto';
import { UsersCpfAlreadyExist } from '../validate/users-cpf-already-exist.contraint';
import { UsersEmailAlreadyExist } from '../validate/users-email-already-exist.contraint';
import { UsersPhoneNumberAlreadyExist } from '../validate/users-phone-number-already-exist.contraint';

export class UserUpdateDto {
  @IsNotEmpty({ message: 'O campo de ID é obrigátorio.' })
  id: number;

  @IsNotEmpty({ message: 'O campo Nome é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório.' })
  @Validate(UsersCpfAlreadyExist, { message: 'Já existe um usuário com este CPF.' })
  cpf: string;

  @IsNotEmpty({ message: 'O campo E-mail é obrigatório.' })
  @Validate(UsersEmailAlreadyExist, { message: 'Já existe um usuário com este E-mail.' })
  email: string;

  @IsNotEmpty({ message: 'O campo Número de Telefone é obrigatório.' })
  @Validate(UsersPhoneNumberAlreadyExist, {
    message: 'Já existe um usuário com este Número de Telefone.',
  })
  phoneNumber: string;

  @IsOptional()
  status: boolean;

  @IsArray()
  @ArrayMinSize(1, { message: 'Informe ao menos um conhecimento' })
  @ArrayMaxSize(3, { message: 'Informe no máximo 3 conhecimento' })
  @ValidateNested({ each: true })
  @Type(() => UserKnowledgeDto)
  knowledges: UserKnowledgeDto[];
}

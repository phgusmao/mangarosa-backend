import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserKnowledgeDto } from './user-knowledge.dto';

export class UserUpdateDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'O campo cpf é obrigatório.' })
  cpf: string;

  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'O campo número de telefone é obrigatório.' })
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

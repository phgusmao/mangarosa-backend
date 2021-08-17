import { IsNotEmpty } from 'class-validator';

export class UserKnowledgeDto {
  @IsNotEmpty({ message: 'Campo nome do conhecimento é obrigátorio.' })
  name: string;
}

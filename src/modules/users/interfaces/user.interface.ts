export interface UserInterface {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

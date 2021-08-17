/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from '../users.service';
import { UserInterface } from '../interfaces/user.interface';

let service: UsersService;

@ValidatorConstraint({ name: 'UsersPhoneNumberAlreadyExist', async: true })
export class UsersPhoneNumberAlreadyExist implements ValidatorConstraintInterface, OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(UsersService);
  }

  async validate(phoneNumber: string, validationArguments: ValidationArguments): Promise<boolean> {
    const body: UserInterface = Object.assign(validationArguments.object);
    const entity = await service.findByPhoneNumber(phoneNumber, body);
    return !entity;
  }
}

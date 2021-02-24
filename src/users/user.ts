import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field(type => String)
  email: string;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field()
  role: string;

  @Field(type => String)
  createdAt: Date;
}

export enum ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN',
  RANGER = 'RANGER',
  DOCTOR = 'DOCTOR',
}

registerEnumType(ROLES, { name: 'ROLES' });

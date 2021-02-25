import {
    InputType,
    Field,
  } from '@nestjs/graphql';
  import { ROLES } from '../dto/user';
@InputType()
export class SingUpUserInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field(type => ROLES)
  role: ROLES;
}
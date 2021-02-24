import { Field, ObjectType, ID } from '@nestjs/graphql';

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

  @Field(type => String)
  role: string;

  @Field(type => String)
  createdAt: string;
}

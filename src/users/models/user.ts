import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field({ nullable: true })
  isSubsrcibed?: boolean;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class groups {
  @Field()
  id: string;

  @Field()
  leaderId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';

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
  created_at: Date;

  @Field()
  leader: User;
}

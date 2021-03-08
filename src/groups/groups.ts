import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user';

@ObjectType()
export class groups {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  leaderId: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  created_at: Date;

  @Field()
  @IsNotEmpty()
  leader: User;
}

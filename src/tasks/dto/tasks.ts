import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(type => ID)
  id: string;
  @Field(type => ID)
  group: string;
  @Field(type => ID)
  added_by: string;
  @Field(type => Date)
  date: Date;
  @Field(type => Date)
  createdAt: Date;
  @Field(type => Date)
  updatedAt: Date;
  @Field(type => ID)
  family: string;
  @Field(type => Boolean)
  isCompleted: boolean;
}

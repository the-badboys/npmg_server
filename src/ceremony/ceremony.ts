import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Ceremony {
  @Field(type => ID)
  id: string;

  @Field(type => Date)
  ceremony_date: Date;

  @Field(type => Date)
  created_at: Date;

  @Field(type => String)
  title: string;

  @Field(type => Date)
  babies: Date;

  @Field(type => String)
  venue: String;

  @Field(type => String)
  description: String;
}
